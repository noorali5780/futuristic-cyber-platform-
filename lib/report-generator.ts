import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ReportData {
    website: any;
    scans: any[];
}

// Strip ANSI escape codes from strings
function stripAnsi(str: string): string {
    return str.replace(/\x1B\[[0-9;]*[mGKH]/g, '').replace(/\[[\d;]*m/g, '');
}

// Draw a simple bar chart
function drawBarChart(doc: jsPDF, x: number, y: number, width: number, height: number, data: { label: string, value: number, color: number[] }[]) {
    const maxValue = Math.max(...data.map(d => d.value), 1);
    const barWidth = (width - 20) / data.length;
    const padding = 5;

    // Draw bars
    data.forEach((item, i) => {
        const barHeight = (item.value / maxValue) * (height - 30);
        const barX = x + padding + (i * barWidth) + (barWidth * 0.1);
        const barY = y + height - 25 - barHeight;

        doc.setFillColor(item.color[0], item.color[1], item.color[2]);
        doc.rect(barX, barY, barWidth * 0.8, barHeight, 'F');

        // Label
        doc.setFontSize(7);
        doc.setTextColor(50);
        doc.text(item.label, barX + (barWidth * 0.4), y + height - 15, { align: 'center' });

        // Value
        doc.setFontSize(8);
        doc.setTextColor(0);
        doc.text(String(item.value), barX + (barWidth * 0.4), barY - 3, { align: 'center' });
    });
}

export async function generateSecurityReport(data: ReportData): Promise<ArrayBuffer> {
    const { website, scans } = data;
    const doc = new jsPDF();
    const latestScan = scans[0];
    const details = latestScan?.details || {};
    const score = latestScan?.securityScore || 0;

    // ========== PAGE 1: COVER & EXECUTIVE SUMMARY ==========
    
    // Header with gradient effect
    doc.setFillColor(20, 30, 50);
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text("SECURITY AUDIT REPORT", 105, 25, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 200, 255);
    doc.text("Comprehensive Vulnerability Assessment", 105, 35, { align: 'center' });

    // Metadata box
    doc.setFillColor(245, 247, 250);
    doc.rect(14, 55, 182, 35, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.text(`Target: ${website.name}`, 20, 65);
    doc.text(`URL: ${website.url}`, 20, 72);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 79);
    doc.text(`Scan Duration: ${details.duration ? Math.round(details.duration / 60000) + ' minutes' : 'N/A'}`, 120, 65);
    doc.text(`Subdomains: ${details.subdomains?.length || 0}`, 120, 72);
    doc.text(`IP: ${website.ip || 'Multiple'}`, 120, 79);

    // Security Score Circle
    const scoreColor = score >= 80 ? [0, 180, 0] : score >= 50 ? [255, 165, 0] : [220, 53, 69];
    doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.circle(170, 115, 20, 'F');
    doc.setFontSize(24);
    doc.setTextColor(255);
    doc.text(String(score), 170, 120, { align: 'center' });
    doc.setFontSize(8);
    doc.text('/100', 170, 128, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Security Score", 170, 145, { align: 'center' });

    // Summary Statistics
    doc.setFontSize(16);
    doc.setTextColor(20, 30, 50);
    doc.text("Executive Summary", 14, 110);

    const summary = details.summary || {};
    const statsData = [
        { label: 'Subdomains', value: summary.totalSubdomains || 0, color: [41, 128, 185] },
        { label: 'Open Ports', value: summary.totalOpenPorts || 0, color: [155, 89, 182] },
        { label: 'Critical', value: summary.criticalCount || 0, color: [192, 57, 43] },
        { label: 'High', value: summary.highCount || 0, color: [230, 126, 34] },
        { label: 'Medium', value: summary.mediumCount || 0, color: [241, 196, 15] },
        { label: 'Low', value: summary.lowCount || 0, color: [46, 204, 113] }
    ];

    drawBarChart(doc, 14, 115, 130, 70, statsData);

    // Threat Level Assessment
    doc.setFontSize(12);
    doc.setTextColor(50);
    const threatLevel = score >= 80 ? 'LOW RISK' : score >= 50 ? 'MODERATE RISK' : 'HIGH RISK';
    const threatDesc = score >= 80 
        ? 'System shows strong security posture with minimal vulnerabilities.'
        : score >= 50 
        ? 'Some security issues detected that require attention.'
        : 'Critical security issues found requiring immediate action.';
    
    doc.text(`Threat Assessment: ${threatLevel}`, 14, 195);
    doc.setFontSize(10);
    doc.text(threatDesc, 14, 203);

    // ========== PAGE 2: ALL SUBDOMAINS ==========
    doc.addPage();
    
    doc.setFillColor(20, 30, 50);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setFontSize(16);
    doc.setTextColor(255);
    doc.text("SUBDOMAIN ENUMERATION", 105, 14, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total Subdomains Discovered: ${details.subdomains?.length || 0}`, 14, 30);

    // Subdomains table
    const subdomainList = (details.subdomains || []).map((sd: string, i: number) => [i + 1, sd]);
    
    if (subdomainList.length > 0) {
        autoTable(doc, {
            startY: 35,
            head: [['#', 'Subdomain']],
            body: subdomainList,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185], fontSize: 10 },
            styles: { fontSize: 8 },
            columnStyles: { 0: { cellWidth: 15 } }
        });
    }

    // ========== PAGE 3: PORT SCAN RESULTS ==========
    doc.addPage();
    
    doc.setFillColor(20, 30, 50);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setFontSize(16);
    doc.setTextColor(255);
    doc.text("PORT SCAN RESULTS (NMAP -A)", 105, 14, { align: 'center' });

    let portY = 30;
    const subdomainScans = details.subdomainScans || [];

    for (const scan of subdomainScans) {
        if (portY > 260) {
            doc.addPage();
            portY = 20;
        }

        doc.setFontSize(11);
        doc.setTextColor(0, 100, 150);
        doc.text(`▶ ${scan.subdomain}`, 14, portY);
        portY += 7;

        const ports = scan.ports || [];
        if (ports.length > 0) {
            autoTable(doc, {
                startY: portY,
                head: [['Port', 'State', 'Service', 'Version/Details']],
                body: ports.map((p: any) => [
                    p.port,
                    p.state || 'open',
                    p.service || 'unknown',
                    stripAnsi(p.version || '').substring(0, 40)
                ]),
                theme: 'striped',
                headStyles: { fillColor: [155, 89, 182], fontSize: 9 },
                styles: { fontSize: 8 },
                margin: { left: 14 }
            });
            portY = (doc as any).lastAutoTable.finalY + 10;
        } else {
            doc.setFontSize(9);
            doc.setTextColor(100);
            doc.text("   No open ports detected or host unreachable", 14, portY);
            portY += 10;
        }
    }

    // ========== PAGE 4: NUCLEI VULNERABILITIES ==========
    doc.addPage();
    
    doc.setFillColor(20, 30, 50);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setFontSize(16);
    doc.setTextColor(255);
    doc.text("VULNERABILITY SCAN (NUCLEI)", 105, 14, { align: 'center' });

    let vulnY = 30;

    for (const scan of subdomainScans) {
        if (vulnY > 260) {
            doc.addPage();
            vulnY = 20;
        }

        const findings = (scan.nucleiFindings || []).filter((f: any) => 
            !f.name?.includes('[WRN]') && !f.name?.includes('Loading')
        );
        
        if (findings.length === 0) continue;

        doc.setFontSize(11);
        doc.setTextColor(0, 100, 150);
        doc.text(`▶ ${scan.subdomain}`, 14, vulnY);
        vulnY += 7;

        autoTable(doc, {
            startY: vulnY,
            head: [['Severity', 'ID', 'Finding']],
            body: findings.map((f: any) => [
                f.severity?.toUpperCase() || 'INFO',
                f.id || 'N/A',
                stripAnsi(f.name || '').substring(0, 60)
            ]),
            theme: 'striped',
            headStyles: { fillColor: [192, 57, 43], fontSize: 9 },
            styles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 20 },
                1: { cellWidth: 30 }
            },
            didParseCell: (data) => {
                if (data.section === 'body' && data.column.index === 0) {
                    const sev = String(data.cell.raw).toLowerCase();
                    if (sev === 'critical') data.cell.styles.fillColor = [192, 57, 43];
                    else if (sev === 'high') data.cell.styles.fillColor = [230, 126, 34];
                    else if (sev === 'medium') data.cell.styles.fillColor = [241, 196, 15];
                    else data.cell.styles.fillColor = [46, 204, 113];
                    data.cell.styles.textColor = [255, 255, 255];
                }
            }
        });
        vulnY = (doc as any).lastAutoTable.finalY + 10;
    }

    // ========== PAGE 5: NIKTO WEB SCAN ==========
    doc.addPage();
    
    doc.setFillColor(20, 30, 50);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setFontSize(16);
    doc.setTextColor(255);
    doc.text("WEB SERVER SCAN (NIKTO)", 105, 14, { align: 'center' });

    let niktoY = 30;

    for (const scan of subdomainScans) {
        if (niktoY > 260) {
            doc.addPage();
            niktoY = 20;
        }

        const niktoFindings = (scan.niktoFindings || []).filter((f: string) => 
            f && !f.includes('0 host(s) tested') && f.length > 5
        );

        if (niktoFindings.length === 0) continue;

        doc.setFontSize(11);
        doc.setTextColor(0, 100, 150);
        doc.text(`▶ ${scan.subdomain}`, 14, niktoY);
        niktoY += 7;

        autoTable(doc, {
            startY: niktoY,
            head: [['#', 'Finding']],
            body: niktoFindings.map((f: string, i: number) => [
                i + 1,
                stripAnsi(f).substring(0, 90)
            ]),
            theme: 'striped',
            headStyles: { fillColor: [39, 174, 96], fontSize: 9 },
            styles: { fontSize: 7 },
            columnStyles: { 0: { cellWidth: 10 } }
        });
        niktoY = (doc as any).lastAutoTable.finalY + 10;
    }

    // ========== FINAL PAGE: SCAN HISTORY ==========
    doc.addPage();
    
    doc.setFillColor(20, 30, 50);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setFontSize(16);
    doc.setTextColor(255);
    doc.text("SCAN HISTORY", 105, 14, { align: 'center' });

    const historyData = scans.slice(0, 15).map((s: any) => [
        new Date(s.timestamp).toLocaleString(),
        s.status,
        `${s.latency}s`,
        s.securityScore,
        (s.vulnerabilities || []).length + ' issues'
    ]);

    autoTable(doc, {
        startY: 30,
        head: [['Timestamp', 'Status', 'Duration', 'Score', 'Findings']],
        body: historyData,
        theme: 'striped',
        headStyles: { fillColor: [52, 73, 94], fontSize: 10 }
    });

    // Footer on all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFillColor(245, 247, 250);
        doc.rect(0, 285, 210, 12, 'F');
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text(`Page ${i} of ${pageCount}`, 105, 291, { align: 'center' });
        doc.text('SecureGuard Security Platform', 14, 291);
        doc.text(new Date().toLocaleDateString(), 196, 291, { align: 'right' });
    }

    return doc.output('arraybuffer');
}
