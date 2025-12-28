export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: {
        name: string;
        role: string;
        avatar?: string;
    };
    publishedAt: string;
    readTime: string;
    tags: string[];
    featured: boolean;
}

export const blogPosts: BlogPost[] = [
    {
        id: "ai-security-2025",
        title: "The State of AI Security in 2025: Emerging Threats and Defense Strategies",
        excerpt: "Explore the latest AI security threats including model poisoning, adversarial attacks, and prompt injection, along with cutting-edge defense mechanisms.",
        content: `# The State of AI Security in 2025

As artificial intelligence becomes increasingly integrated into critical systems, the attack surface for AI-specific vulnerabilities has expanded dramatically. This comprehensive guide explores the current threat landscape and proven defense strategies.

## Emerging Threat Vectors

### 1. Model Poisoning Attacks
Attackers are now targeting ML training pipelines at scale, injecting malicious data to corrupt model behavior. Recent incidents show a 300% increase in poisoning attempts.

### 2. Adversarial Machine Learning
Sophisticated adversarial examples can now bypass even state-of-the-art defenses, requiring new approaches to input validation and model hardening.

### 3. Prompt Injection Evolution
LLMs face increasingly sophisticated prompt injection techniques. Defense requires multi-layered validation and context-aware filtering.

## Defense Strategies

- **Input Sanitization**: Implement robust validation at every entry point
- **Model Monitoring**: Real-time anomaly detection for model behavior
- **Secure Pipelines**: End-to-end encryption and access control
- **Regular Audits**: Continuous security assessments of AI systems

## Conclusion

AI security requires a proactive, defense-in-depth approach. Organizations must invest in specialized AI security teams and implement comprehensive monitoring.`,
        category: "AI Security",
        author: {
            name: "Sadiki A. Noor",
            role: "Security Researcher",
        },
        publishedAt: "2025-01-15",
        readTime: "8 min read",
        tags: ["AI Security", "Machine Learning", "Threat Intelligence"],
        featured: true,
    },
    {
        id: "zero-trust-implementation",
        title: "Implementing Zero-Trust Architecture: A Practical Guide for African Enterprises",
        excerpt: "Learn how African organizations can implement Zero-Trust security models to protect against advanced persistent threats and insider attacks.",
        content: `# Implementing Zero-Trust Architecture

Zero-Trust is no longer optional for modern enterprises. This guide provides practical steps for African organizations to implement Zero-Trust security.

## Core Principles

1. **Verify Explicitly**: Never trust, always verify
2. **Least Privilege Access**: Minimal permissions required
3. **Assume Breach**: Design assuming compromise

## Implementation Roadmap

### Phase 1: Identity Foundation
Establish strong identity management with MFA and risk-based authentication.

### Phase 2: Network Segmentation
Implement micro-segmentation to contain potential breaches.

### Phase 3: Continuous Monitoring
Deploy real-time threat detection and response capabilities.

## Benefits for African Organizations

- Reduced attack surface
- Improved compliance posture
- Enhanced data protection
- Better incident response`,
        category: "Zero Trust",
        author: {
            name: "Manilla Security Team",
            role: "Enterprise Solutions",
        },
        publishedAt: "2025-01-10",
        readTime: "6 min read",
        tags: ["Zero Trust", "Enterprise Security", "Africa"],
        featured: true,
    },
    {
        id: "active-directory-hardening",
        title: "Active Directory Hardening: Defending Against Kerberoasting and Golden Ticket Attacks",
        excerpt: "Comprehensive guide to securing Active Directory infrastructure against advanced attack techniques used by threat actors worldwide.",
        content: `# Active Directory Hardening Guide

Active Directory remains a prime target for attackers. This guide covers essential hardening techniques to defend against common AD attacks.

## Common Attack Vectors

### Kerberoasting
Service accounts with weak passwords are vulnerable to offline cracking. Mitigation requires strong passwords and managed service accounts.

### Golden Ticket Attacks
Compromise of the KRBTGT account allows attackers to forge tickets. Regular password rotation and monitoring are critical.

### Pass-the-Hash
NTLM vulnerabilities enable credential theft. Disable NTLM where possible and implement credential protection.

## Hardening Checklist

- ✅ Implement tiered administration model
- ✅ Enable advanced auditing
- ✅ Deploy Protected Users security group
- ✅ Use managed service accounts
- ✅ Regular KRBTGT password rotation
- ✅ Implement Microsoft LAPS
- ✅ Monitor authentication anomalies

## Detection Engineering

Set up alerts for:
- Unusual ticket requests
- Lateral movement patterns
- Privilege escalation attempts
- Suspicious authentication events`,
        category: "Active Directory",
        author: {
            name: "Sadiki A. Noor",
            role: "AD Security Specialist",
        },
        publishedAt: "2025-01-05",
        readTime: "10 min read",
        tags: ["Active Directory", "Windows Security", "Enterprise"],
        featured: false,
    },
    {
        id: "cloud-security-africa",
        title: "Cloud Security Posture Management for African Cloud Deployments",
        excerpt: "Best practices for securing multi-cloud environments in African regions, covering AWS, Azure, and GCP security configurations.",
        content: `# Cloud Security Posture Management in Africa

As African organizations embrace cloud computing, proper security configuration becomes critical. This guide covers CSPM best practices.

## Multi-Cloud Challenges

African organizations often use multiple cloud providers, creating complex security management requirements.

## Key Security Controls

### 1. Identity and Access Management
- Role-based access control
- Service account management
- MFA enforcement
- Regular access reviews

### 2. Network Security
- VPC/VNet segmentation
- Security groups configuration
- Private endpoints
- WAF deployment

### 3. Data Protection
- Encryption at rest and in transit
- Key management
- Data classification
- Backup strategies

## African-Specific Considerations

- Data sovereignty requirements
- Regulatory compliance (POPIA, GDPR)
- Regional availability zones
- Network latency optimization

## Automated Compliance

Implement continuous compliance monitoring with tools like:
- AWS Security Hub
- Azure Security Center
- GCP Security Command Center`,
        category: "Cloud Security",
        author: {
            name: "Manilla Security Team",
            role: "Cloud Security Architects",
        },
        publishedAt: "2024-12-28",
        readTime: "7 min read",
        tags: ["Cloud Security", "CSPM", "Africa", "Compliance"],
        featured: false,
    },
    {
        id: "threat-hunting-techniques",
        title: "Advanced Threat Hunting Techniques for SOC Teams",
        excerpt: "Master proactive threat hunting methodologies using the MITRE ATT&CK framework and behavioral analytics to detect sophisticated adversaries.",
        content: `# Advanced Threat Hunting Techniques

Modern SOC teams must go beyond reactive alerting to proactively hunt for threats. This guide covers advanced hunting techniques.

## Threat Hunting Framework

### 1. Hypothesis Development
Start with intelligence-driven hypotheses about attacker behavior.

### 2. Data Collection
Gather relevant logs and telemetry from multiple sources.

### 3. Investigation
Analyze data for indicators of compromise and tactics, techniques, and procedures (TTPs).

### 4. Response
Validate findings and coordinate with incident response.

## MITRE ATT&CK Integration

Map your hunting activities to ATT&CK tactics:
- Initial Access
- Execution
- Persistence
- Privilege Escalation
- Defense Evasion
- Credential Access
- Discovery
- Lateral Movement
- Collection
- Exfiltration

## Tools and Techniques

- **EDR Platforms**: Endpoint visibility
- **SIEM Correlation**: Cross-source analysis
- **Threat Intelligence**: IOC and TTP enrichment
- **Behavioral Analytics**: Anomaly detection

## Hunt Metrics

Track hunt effectiveness:
- Time to detect (TTD)
- Coverage of ATT&CK matrix
- False positive rate
- Hunt velocity`,
        category: "Threat Intelligence",
        author: {
            name: "Sadiki A. Noor",
            role: "Threat Hunter",
        },
        publishedAt: "2024-12-20",
        readTime: "9 min read",
        tags: ["Threat Hunting", "SOC", "MITRE ATT&CK", "Detection"],
        featured: true,
    },
    {
        id: "api-security-best-practices",
        title: "API Security Best Practices: OAuth 2.0, JWT, and Rate Limiting",
        excerpt: "Secure your APIs with proven authentication, authorization, and rate limiting strategies to prevent abuse and data breaches.",
        content: `# API Security Best Practices

APIs are the backbone of modern applications, making their security critical. This guide covers essential API security controls.

## Authentication & Authorization

### OAuth 2.0 Implementation
Use industry-standard OAuth 2.0 for delegated authorization:
- Authorization Code flow for web apps
- Client Credentials for service-to-service
- PKCE extension for mobile apps

### JWT Best Practices
- Short expiration times
- Secure signing algorithms (RS256)
- Proper validation of all claims
- Revocation mechanisms

## Rate Limiting Strategies

### 1. Token Bucket Algorithm
Smooth request distribution while allowing bursts.

### 2. Sliding Window
More accurate rate limiting with lower memory overhead.

### 3. User-Based Limits
Different limits for authenticated vs anonymous users.

## API Gateway Security

- Input validation
- Output encoding
- CORS configuration
- API versioning
- Request/response logging

## Common Vulnerabilities

- Broken Object Level Authorization (BOLA)
- Excessive Data Exposure
- Mass Assignment
- Security Misconfiguration
- Injection attacks

## Monitoring and Alerting

Set up alerts for:
- Unusual traffic patterns
- Failed authentication attempts
- Rate limit violations
- Suspicious parameter values`,
        category: "Application Security",
        author: {
            name: "Manilla Security Team",
            role: "Application Security",
        },
        publishedAt: "2024-12-15",
        readTime: "8 min read",
        tags: ["API Security", "OAuth", "JWT", "Application Security"],
        featured: false,
    },
];

export const categories = [
    "All",
    "AI Security",
    "Zero Trust",
    "Active Directory",
    "Cloud Security",
    "Threat Intelligence",
    "Application Security",
];
