/**
 * Deep Security Scanning Module v2
 * 
 * Key Improvements:
 * - Sequential tool execution (not parallel) to avoid resource contention
 * - Longer timeouts for comprehensive scans
 * - Single scan per website (prevents duplicate scans)
 * - Completely isolated from HTTP request lifecycle
 * - Graceful timeout handling
 */

import { exec, ChildProcess } from 'child_process';
import { promisify } from 'util';
import { prisma } from '@/lib/prisma';
import { logSystemEvent } from './logger';

const execAsync = promisify(exec);

// Track active scans to prevent duplicates
const activeScans = new Set<string>();

// Extend PATH for CLI tools
function getExtendedEnv() {
    return {
        ...process.env,
        PATH: `${process.env.HOME}/go/bin:/usr/local/bin:${process.env.PATH}`
    };
}

/**
 * Run a command with proper timeout and output capture
 * Returns output even if command times out or fails
 */
async function runCommand(command: string, timeoutMs: number = 300000): Promise<{ output: string; completed: boolean }> {
    return new Promise((resolve) => {
        const startTime = Date.now();
        let output = '';
        let completed = false;
        let childProcess: ChildProcess | null = null;

        try {
            childProcess = exec(command, {
                env: getExtendedEnv(),
                maxBuffer: 10 * 1024 * 1024 // 10MB buffer
            });

            if (childProcess.stdout) {
                childProcess.stdout.on('data', (data) => {
                    output += data;
                });
            }

            if (childProcess.stderr) {
                childProcess.stderr.on('data', (data) => {
                    output += data; // Include stderr in output
                });
            }

            childProcess.on('close', (code) => {
                completed = true;
                const duration = Date.now() - startTime;
                console.log(`[CMD] Completed in ${Math.round(duration / 1000)}s: ${command.substring(0, 50)}...`);
                resolve({ output, completed: true });
            });

            childProcess.on('error', (error) => {
                console.error(`[CMD] Error:`, error);
                resolve({ output, completed: false });
            });

            // Timeout handler - kill process gracefully
            setTimeout(() => {
                if (!completed && childProcess) {
                    console.log(`[CMD] Timeout after ${timeoutMs / 1000}s, killing: ${command.substring(0, 50)}...`);
                    childProcess.kill('SIGTERM');
                    setTimeout(() => {
                        if (childProcess && !childProcess.killed) {
                            childProcess.kill('SIGKILL');
                        }
                    }, 5000);
                    resolve({ output, completed: false });
                }
            }, timeoutMs);

        } catch (error) {
            console.error(`[CMD] Failed to start:`, error);
            resolve({ output: '', completed: false });
        }
    });
}

// ============ SUBDOMAIN ENUMERATION ============

async function enumerateSubdomains(domain: string): Promise<string[]> {
    console.log(`[DeepScan] Enumerating subdomains for: ${domain}`);
    const { output } = await runCommand(`sublist3r -d ${domain} -n`, 300000); // 5 min timeout

    const allDomains = output.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/gi) || [];
    const unique = Array.from(new Set(allDomains)).filter(d => d.toLowerCase().endsWith(domain.toLowerCase()));

    console.log(`[DeepScan] Found ${unique.length} subdomains`);
    return unique.length > 0 ? unique : [domain];
}

// ============ INDIVIDUAL TOOL SCANNERS ============

interface PortResult {
    port: number;
    service: string;
    state: string;
    version?: string;
}

interface VulnResult {
    id: string;
    severity: string;
    name: string;
    url?: string;
}

async function scanNmap(target: string): Promise<PortResult[]> {
    console.log(`[Nmap] Starting comprehensive scan: ${target}`);

    // Use -A for comprehensive scan with 5 minute timeout
    const { output, completed } = await runCommand(`nmap -A -Pn ${target}`, 300000);

    console.log(`[Nmap] ${completed ? 'Completed' : 'Timed out'} for ${target}`);
    console.log(`[Nmap] Output length: ${output.length} chars`);

    const ports: PortResult[] = [];
    for (const line of output.split('\n')) {
        // Match: 80/tcp  open  http  Apache httpd 2.4.41
        const match = line.match(/^(\d+)\/tcp\s+(open|filtered)\s+(\S+)\s*(.*)/);
        if (match) {
            ports.push({
                port: parseInt(match[1]),
                state: match[2],
                service: match[3],
                version: match[4]?.trim() || undefined
            });
        }
    }

    console.log(`[Nmap] Found ${ports.length} ports for ${target}`);
    return ports;
}

async function scanNuclei(target: string): Promise<VulnResult[]> {
    console.log(`[Nuclei] Starting vulnerability scan: ${target}`);

    // Use -jsonl for parseable output, 5 minute timeout
    const { output, completed } = await runCommand(`nuclei -target ${target} -jsonl`, 300000);

    console.log(`[Nuclei] ${completed ? 'Completed' : 'Timed out'} for ${target}`);
    console.log(`[Nuclei] Output length: ${output.length} chars`);

    const findings: VulnResult[] = [];
    for (const line of output.split('\n')) {
        if (!line.trim() || line.startsWith('[WRN]') || line.startsWith('[INF]')) continue;

        try {
            const parsed = JSON.parse(line);
            findings.push({
                id: parsed.templateID || parsed['template-id'] || 'unknown',
                severity: parsed.info?.severity || parsed.severity || 'info',
                name: parsed.info?.name || parsed.name || 'Unknown Finding',
                url: parsed.matched || parsed['matched-at'] || target
            });
        } catch {
            // Parse text output format: [severity] [template-id] [matcher-name] URL
            if (line.includes('[') && line.includes(']')) {
                findings.push({
                    id: 'nuclei-finding',
                    severity: line.includes('[critical]') ? 'critical' :
                        line.includes('[high]') ? 'high' :
                            line.includes('[medium]') ? 'medium' : 'low',
                    name: line.substring(0, 150)
                });
            }
        }
    }

    console.log(`[Nuclei] Found ${findings.length} vulnerabilities for ${target}`);
    return findings;
}

async function scanNikto(target: string): Promise<string[]> {
    console.log(`[Nikto] Starting web server scan: ${target}`);

    // 3 minute timeout for Nikto
    const { output, completed } = await runCommand(`nikto -host ${target} -maxtime 180s`, 240000);

    console.log(`[Nikto] ${completed ? 'Completed' : 'Timed out'} for ${target}`);
    console.log(`[Nikto] Output length: ${output.length} chars`);

    const findings = output.split('\n')
        .filter(l => l.startsWith('+') || l.includes('OSVDB') || l.includes('Server:'))
        .slice(0, 25);

    console.log(`[Nikto] Found ${findings.length} items for ${target}`);
    return findings;
}

// ============ PER-SUBDOMAIN SCANNING (SEQUENTIAL) ============

interface SubdomainScanResult {
    subdomain: string;
    ports: PortResult[];
    nucleiFindings: VulnResult[];
    niktoFindings: string[];
    scannedAt: string;
    scanDuration: number;
}

async function scanSubdomain(subdomain: string): Promise<SubdomainScanResult> {
    console.log(`\n[DeepScan] ════════════════════════════════════════`);
    console.log(`[DeepScan] Scanning subdomain: ${subdomain}`);
    console.log(`[DeepScan] ════════════════════════════════════════\n`);

    const startTime = Date.now();

    // SEQUENTIAL execution - one tool at a time to avoid resource contention
    // This ensures each tool gets full system resources and completes properly

    const ports = await scanNmap(subdomain);

    // Small delay between tools
    await new Promise(r => setTimeout(r, 2000));

    const nucleiFindings = await scanNuclei(`https://${subdomain}`);

    await new Promise(r => setTimeout(r, 2000));

    const niktoFindings = await scanNikto(`https://${subdomain}`);

    const scanDuration = Date.now() - startTime;

    console.log(`[DeepScan] Subdomain ${subdomain} completed in ${Math.round(scanDuration / 1000)}s`);

    return {
        subdomain,
        ports,
        nucleiFindings,
        niktoFindings,
        scannedAt: new Date().toISOString(),
        scanDuration
    };
}

// ============ MAIN DEEP SCAN FUNCTION ============

export interface DeepScanResult {
    mainDomain: string;
    subdomains: string[];
    subdomainScans: SubdomainScanResult[];
    summary: {
        totalSubdomains: number;
        totalOpenPorts: number;
        totalVulnerabilities: number;
        criticalCount: number;
        highCount: number;
        mediumCount: number;
        lowCount: number;
    };
    scannedAt: string;
    duration: number;
}

export async function performDeepScan(websiteId: string): Promise<DeepScanResult | null> {
    // Prevent duplicate scans
    if (activeScans.has(websiteId)) {
        console.log(`[DeepScan] Scan already in progress for ${websiteId}`);
        return null;
    }

    activeScans.add(websiteId);
    const startTime = Date.now();

    try {
        // Get website
        const website = await prisma.website.findUnique({
            where: { id: websiteId },
            include: { user: true }
        });

        if (!website) {
            console.error('[DeepScan] Website not found:', websiteId);
            return null;
        }

        // Update status to scanning
        await prisma.website.update({
            where: { id: websiteId },
            data: { status: 'scanning' }
        });

        const domain = website.url.replace(/^https?:\/\//, '').split('/')[0];
        console.log(`\n[DeepScan] ╔══════════════════════════════════════════════╗`);
        console.log(`[DeepScan] ║ Starting Deep Scan for: ${domain.padEnd(20)} ║`);
        console.log(`[DeepScan] ╚══════════════════════════════════════════════╝\n`);

        // Step 1: Enumerate subdomains
        const subdomains = await enumerateSubdomains(domain);

        // Step 2: Scan each subdomain SEQUENTIALLY (limit to 5 for reasonable time)
        const subdomainsToScan = subdomains.slice(0, 5);
        console.log(`[DeepScan] Will scan ${subdomainsToScan.length} of ${subdomains.length} subdomains`);

        const subdomainScans: SubdomainScanResult[] = [];
        for (let i = 0; i < subdomainsToScan.length; i++) {
            console.log(`\n[DeepScan] Progress: ${i + 1}/${subdomainsToScan.length}`);
            const result = await scanSubdomain(subdomainsToScan[i]);
            subdomainScans.push(result);

            // Update progress in database
            await prisma.website.update({
                where: { id: websiteId },
                data: {
                    ip: `Scanning ${i + 1}/${subdomainsToScan.length}...`
                }
            });
        }

        // Step 3: Aggregate results
        let totalOpenPorts = 0;
        let criticalCount = 0;
        let highCount = 0;
        let mediumCount = 0;
        let lowCount = 0;

        for (const scan of subdomainScans) {
            totalOpenPorts += scan.ports.length;
            for (const finding of scan.nucleiFindings) {
                if (finding.severity === 'critical') criticalCount++;
                else if (finding.severity === 'high') highCount++;
                else if (finding.severity === 'medium') mediumCount++;
                else lowCount++;
            }
        }

        const totalVulnerabilities = criticalCount + highCount + mediumCount + lowCount;
        const duration = Date.now() - startTime;

        const result: DeepScanResult = {
            mainDomain: domain,
            subdomains,
            subdomainScans,
            summary: {
                totalSubdomains: subdomains.length,
                totalOpenPorts,
                totalVulnerabilities,
                criticalCount,
                highCount,
                mediumCount,
                lowCount
            },
            scannedAt: new Date().toISOString(),
            duration
        };

        // Calculate security score
        let score = 100;
        score -= criticalCount * 25;
        score -= highCount * 15;
        score -= mediumCount * 7;
        score -= lowCount * 2;
        if (score < 0) score = 0;

        // Step 4: Save to database
        await prisma.website.update({
            where: { id: websiteId },
            data: {
                status: 'up',
                ip: website.ip || 'Resolved',
                lastScanAt: new Date()
            }
        });

        await prisma.scanResult.create({
            data: {
                websiteId: website.id,
                status: 200,
                latency: Math.round(duration / 1000),
                ssl: { valid: true, issuer: 'Unknown', expires: 'Unknown', daysRemaining: 0 },
                headers: {},
                details: result as any,
                securityScore: score,
                vulnerabilities: [
                    `${subdomains.length} subdomains discovered`,
                    `${subdomainsToScan.length} subdomains fully scanned`,
                    `${totalOpenPorts} open ports detected`,
                    `${criticalCount} critical, ${highCount} high, ${mediumCount} medium, ${lowCount} low vulnerabilities`
                ]
            }
        });

        await logSystemEvent('info', `Deep scan completed for ${website.name}`, website.user.id, {
            score,
            subdomains: subdomains.length,
            scanned: subdomainsToScan.length,
            ports: totalOpenPorts,
            vulns: totalVulnerabilities,
            duration: Math.round(duration / 1000)
        });

        console.log(`\n[DeepScan] ╔══════════════════════════════════════════════╗`);
        console.log(`[DeepScan] ║ SCAN COMPLETE                                ║`);
        console.log(`[DeepScan] ║ Domain: ${domain.padEnd(36)} ║`);
        console.log(`[DeepScan] ║ Score: ${String(score).padEnd(37)} ║`);
        console.log(`[DeepScan] ║ Duration: ${Math.round(duration / 60000)} minutes                         ║`);
        console.log(`[DeepScan] ╚══════════════════════════════════════════════╝\n`);

        return result;

    } catch (error) {
        console.error('[DeepScan] Fatal error:', error);

        await prisma.website.update({
            where: { id: websiteId },
            data: { status: 'down' }
        });

        await logSystemEvent('error', `Deep scan failed for ${websiteId}`, undefined, {
            error: String(error)
        });

        return null;
    } finally {
        // Always remove from active scans
        activeScans.delete(websiteId);
    }
}

/**
 * Check if a scan is currently in progress for a website
 */
export function isScanInProgress(websiteId: string): boolean {
    return activeScans.has(websiteId);
}
