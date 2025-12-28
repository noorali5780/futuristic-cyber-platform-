// Mock data for threat intelligence feeds
export const threatFeed = [
    {
        id: 1,
        type: "Malware",
        severity: "critical",
        description: "Ransomware variant detected targeting healthcare sector",
        timestamp: "2025-12-27T12:15:00Z",
        source: "ThreatIntel-AI",
    },
    {
        id: 2,
        type: "Phishing",
        severity: "high",
        description: "Credential harvesting campaign observed in financial services",
        timestamp: "2025-12-27T11:42:00Z",
        source: "EmailSec-Monitor",
    },
    {
        id: 3,
        type: "APT",
        severity: "critical",
        description: "Advanced persistent threat activity detected in government networks",
        timestamp: "2025-12-27T10:28:00Z",
        source: "NetDefense-Core",
    },
    {
        id: 4,
        type: "DDoS",
        severity: "medium",
        description: "Distributed denial of service attempt blocked",
        timestamp: "2025-12-27T09:15:00Z",
        source: "CloudGuard-Shield",
    },
    {
        id: 5,
        type: "Data Breach",
        severity: "high",
        description: "Unauthorized access attempt to customer database",
        timestamp: "2025-12-27T08:03:00Z",
        source: "DB-Sentinel",
    },
];

// SOC Dashboard metrics
export const socMetrics = {
    threatsBlocked: 1247,
    activeAlerts: 23,
    securityScore: 94,
    uptime: 99.97,
    incidentsResolved: 156,
    meanTimeToDetect: "4.2 min",
    meanTimeToRespond: "12.8 min",
};

// Kill chain stages
export const killChainStages = [
    {
        id: 1,
        name: "Reconnaissance",
        description: "Gathering information about the target",
        detected: true,
    },
    {
        id: 2,
        name: "Weaponization",
        description: "Creating malicious payload",
        detected: true,
    },
    {
        id: 3,
        name: "Delivery",
        description: "Transmitting weapon to target",
        detected: true,
    },
    {
        id: 4,
        name: "Exploitation",
        description: "Exploiting vulnerability",
        detected: false,
    },
    {
        id: 5,
        name: "Installation",
        description: "Installing backdoor or malware",
        detected: false,
    },
    {
        id: 6,
        name: "Command & Control",
        description: "Opening communication channel",
        detected: false,
    },
    {
        id: 7,
        name: "Actions on Objectives",
        description: "Achieving intended goal",
        detected: false,
    },
];

// Code examples for security implementations
export const codeExamples = {
    promptInjection: {
        safe: `// Secure AI prompt handling
function validatePrompt(userInput: string): string {
  // Input sanitization
  const sanitized = userInput
    .replace(/<script>/gi, '')
    .replace(/system:/gi, '')
    .trim();
  
  // Length validation
  if (sanitized.length > 500) {
    throw new Error('Input too long');
  }
  
  // Threat detection
  const threats = ['ignore previous', 'disregard'];
  if (threats.some(t => sanitized.toLowerCase().includes(t))) {
    throw new Error('Potential injection detected');
  }
  
  return sanitized;
}`,
        unsafe: `// Vulnerable AI prompt handling
function handlePrompt(userInput: string): string {
  // Directly passing user input - DANGEROUS!
  return \`You are a helpful assistant. \${userInput}\`;
}`,
    },
    zeroTrust: `// Zero-Trust authentication flow
async function authenticateRequest(req: Request): Promise<boolean> {
  // 1. Verify JWT token
  const token = await verifyJWT(req.headers.authorization);
  
  // 2. Check device fingerprint
  const deviceTrusted = await validateDevice(req.headers['x-device-id']);
  
  // 3. Evaluate risk score
  const riskScore = await calculateRisk({
    location: req.ip,
    time: Date.now(),
    userBehavior: token.patterns,
  });
  
  // 4. Enforce policy
  return deviceTrusted && riskScore < RISK_THRESHOLD;
}`,
    adSecurity: `// Kerberos ticket encryption validation
function validateKerberosTicket(ticket: string): boolean {
  const parsed = parseTicket(ticket);
  
  // Check encryption type (avoid RC4)
  if (parsed.encType === 'RC4_HMAC') {
    logSecurityEvent('Weak encryption detected');
    return false;
  }
  
  // Verify ticket hasn't been replayed
  if (ticketCache.has(parsed.hash)) {
    logSecurityEvent('Replay attack detected');
    return false;
  }
  
  // Validate time skew
  const timeDiff = Math.abs(Date.now() - parsed.timestamp);
  return timeDiff < 5 * 60 * 1000; // 5 minutes
}`,
};

// Security features for badges
export const securityFeatures = [
    "AI Security",
    "Zero Trust",
    "Pentesting",
    "SOC Operations",
    "Threat Intel",
    "Cloud Security",
];
