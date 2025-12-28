"use client";

import { motion } from "framer-motion";
import { Globe, Lock, Code, GitBranch, CheckCircle2, Shield } from "lucide-react";
import SecurityCard from "../ui/SecurityCard";
import { fadeInUp } from "@/lib/animations";

export default function WebSecuritySection() {
    const features = [
        {
            icon: <Shield className="w-12 h-12" />,
            title: "Pentesting Methodology",
            description: "OWASP Top 10 coverage with automated and manual testing. Comprehensive vulnerability assessment and exploitation validation.",
        },
        {
            icon: <GitBranch className="w-12 h-12" />,
            title: "Pipeline Hardening",
            description: "CI/CD security gates with SAST, DAST, and SCA integration. Secure build processes and artifact verification.",
        },
        {
            icon: <Code className="w-12 h-12" />,
            title: "Secure SDLC Visualization",
            description: "Security-first development lifecycle with threat modeling, secure code review, and automated security testing at every stage.",
        },
    ];

    const owaspTop10 = [
        { name: "Broken Access Control", severity: "critical" },
        { name: "Cryptographic Failures", severity: "critical" },
        { name: "Injection", severity: "high" },
        { name: "Insecure Design", severity: "high" },
        { name: "Security Misconfiguration", severity: "medium" },
        { name: "Vulnerable Components", severity: "high" },
        { name: "Authentication Failures", severity: "critical" },
        { name: "Data Integrity Failures", severity: "medium" },
        { name: "Logging Failures", severity: "medium" },
        { name: "SSRF", severity: "high" },
    ];

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "critical":
                return "border-red-500 text-red-500";
            case "high":
                return "border-orange-500 text-orange-500";
            case "medium":
                return "border-yellow-500 text-yellow-500";
            default:
                return "border-blue-500 text-blue-500";
        }
    };

    return (
        <section id="web-security" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <motion.h2
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                >
                    <span className="text-white">Website & </span>
                    <span className="text-gradient">Application Security</span>
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-xl text-gray-300 max-w-3xl mx-auto"
                >
                    Comprehensive penetration testing, secure development lifecycle, and CI/CD pipeline hardening
                </motion.p>
            </motion.div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {features.map((feature, index) => (
                    <SecurityCard key={index} {...feature} />
                ))}
            </div>

            {/* OWASP Top 10 Coverage */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-8 mb-16"
            >
                <div className="flex items-center gap-3 mb-8">
                    <Globe className="w-8 h-8 text-cyber-accent" />
                    <h3 className="text-3xl font-bold">OWASP Top 10 Coverage</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {owaspTop10.map((vuln, index) => (
                        <motion.div
                            key={vuln.name}
                            className={`glass-strong rounded-lg p-4 border-l-4 ${getSeverityColor(vuln.severity)} hover:border-cyber-accent transition-all`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-cyber-green" />
                                    <span className="font-semibold">{vuln.name}</span>
                                </div>
                                <span className={`text-xs uppercase font-bold ${getSeverityColor(vuln.severity).split(" ")[1]}`}>
                                    {vuln.severity}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Secure SDLC Pipeline */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-8"
            >
                <h3 className="text-2xl font-bold mb-8 text-center text-cyber-green">
                    Secure Software Development Lifecycle
                </h3>

                <div className="space-y-6">
                    {[
                        { phase: "Requirements", activities: "Threat Modeling, Security Requirements" },
                        { phase: "Design", activities: "Security Architecture Review, Risk Assessment" },
                        { phase: "Development", activities: "Secure Coding, SAST, Code Review" },
                        { phase: "Testing", activities: "DAST, Penetration Testing, Security QA" },
                        { phase: "Deployment", activities: "Security Hardening, Configuration Audit" },
                        { phase: "Operations", activities: "Monitoring, Incident Response, Updates" },
                    ].map((stage, index) => (
                        <motion.div
                            key={stage.phase}
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="w-32 text-right">
                                <div className="font-bold text-cyber-accent">{stage.phase}</div>
                            </div>
                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-cyber-accent" />
                            <div className="h-px bg-cyber-accent flex-grow" />
                            <div className="glass-strong rounded-lg px-6 py-3 flex-grow max-w-lg">
                                <div className="text-sm text-gray-300">{stage.activities}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
