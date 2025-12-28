# Futuristic Kenya - Cybersecurity Platform

A production-grade cybersecurity platform built with Next.js, featuring comprehensive security domains including AI Security, Zero-Trust Architecture, Active Directory hardening, and Threat Intelligence operations.

## 🚀 Features

### Core Security Domains
- **AI Security**: Model abuse prevention, prompt injection defense, data poisoning mitigation
- **Zero-Trust Architecture**: Identity-first security, continuous verification, micro-segmentation
- **Active Directory Security**: Attack surface mapping, Kerberoasting defense, detection engineering
- **Detection Engine (WIP)**: Automated security assessment engine (still under development) integrating:
  - **Sublist3r**: Subdomain enumeration and discovery
  - **Nmap**: Comprehensive port scanning and service fingerprinting
  - **Nuclei**: Template-based vulnerability assessment
  - **Nikto**: Web server security configuration scanning
- **Threat Intelligence**: Real-time threat feeds, SOC dashboards, kill-chain visualizations
- **Web & Application Security**: Pentesting, OWASP Top 10 coverage, Secure SDLC

## 🏗️ System Architecture

### Multi-Role Identity Management
The platform features a dual-interface architecture designed for both security administrators and end-clients:

- **Admin Ecosystem**: Centralized command center for security personnel to manage global threats, monitor system logs, and oversee all registered users and websites.
- **Client Ecosystem**: Personalized security dashboard for website owners to monitor their specific attack surface, review scan reports, and track security scores.

## 🖥️ Dashboards

### 🛡️ Admin Command Center (`/admin`)
- **Threat Monitoring**: Real-time visualization of detected vulnerabilities across the platform.
- **User Management**: Administrative control over client accounts and permissions.
- **System Logs**: Comprehensive audit trails of all system events and scanning activities.
- **Global Reports**: Aggregated security posture analysis.

### 👤 Client Security Hub (`/dashboard`)
- **Website Monitoring**: Live status and security health tracking for client-owned domains.
- **Deep Scan Integration**: Direct interface to trigger and review comprehensive security audits.
- **Security Scoring**: Dynamic scoring based on vulnerability findings and remediation status.
- **Report Downloads**: Instant access to PDF/JSON audit reports.

- **Additional Features**: Cloud security, container security, API security, compliance frameworks

### Technical Highlights
- 🎨 Dark cybersecurity aesthetic with neon accents
- ✨ Smooth Framer Motion animations
- 📊 Interactive visualizations and live demos
- 💻 Code examples with syntax highlighting
- 🎯 Full TypeScript support
- 📱 Fully responsive design

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Code Highlighting**: React Syntax Highlighter

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 👨‍💻 Developer

**Sadiki A. Noor** | **Manilla Inc**

## 🌍 About Futuristic Kenya

Military-grade cybersecurity engineered in Africa for global deployment. We specialize in production-ready security solutions that protect modern web applications.

## 📄 License

© 2025 Futuristic Kenya. All rights reserved.
