"use client";

import { motion } from "framer-motion";
import { Cloud, Container, Webhook, GitMerge, FileText, Award, Lock, Zap } from "lucide-react";
import SecurityCard from "../ui/SecurityCard";
import { fadeInUp } from "@/lib/animations";

export default function AdditionalFeaturesSection() {
    const additionalFeatures = [
        {
            icon: <Cloud className="w-12 h-12" />,
            title: "Cloud Security (CSPM)",
            description: "Multi-cloud security posture management for AWS, Azure, and GCP. Automated compliance monitoring and misconfiguration detection.",
        },
        {
            icon: <Container className="w-12 h-12" />,
            title: "Container Security",
            description: "Docker and Kubernetes hardening with image scanning, runtime protection, and pod security policies.",
        },
        {
            icon: <Webhook className="w-12 h-12" />,
            title: "API Security",
            description: "OAuth 2.0 and JWT validation, rate limiting, API gateway security, and GraphQL query protection.",
        },
        {
            icon: <GitMerge className="w-12 h-12" />,
            title: "DevSecOps Automation",
            description: "Security-as-code with automated testing, security scanning in CI/CD, and infrastructure-as-code security validation.",
        },
        {
            icon: <FileText className="w-12 h-12" />,
            title: "Incident Response Playbooks",
            description: "Standardized response procedures for common security incidents with step-by-step remediation guides.",
        },
        {
            icon: <Award className="w-12 h-12" />,
            title: "Compliance Frameworks",
            description: "SOC 2, ISO 27001, NIST, GDPR, and HIPAA compliance tracking with automated evidence collection.",
        },
        {
            icon: <Lock className="w-12 h-12" />,
            title: "Data Loss Prevention",
            description: "Content inspection, data classification, and policy enforcement to prevent sensitive data exfiltration.",
        },
        {
            icon: <Zap className="w-12 h-12" />,
            title: "Security Automation",
            description: "SOAR platform integration, automated threat response, and orchestrated security workflows.",
        },
    ];

    const complianceFrameworks = [
        { name: "SOC 2 Type II", coverage: 98 },
        { name: "ISO 27001", coverage: 95 },
        { name: "NIST CSF", coverage: 92 },
        { name: "PCI DSS", coverage: 96 },
        { name: "GDPR", coverage: 100 },
        { name: "HIPAA", coverage: 94 },
    ];

    return (
        <section id="additional-features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                    <span className="text-gradient-matrix">Beyond the Basics</span>
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-xl text-gray-300 max-w-3xl mx-auto"
                >
                    Comprehensive security coverage across cloud, containers, APIs, compliance, and more
                </motion.p>
            </motion.div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {additionalFeatures.map((feature, index) => (
                    <SecurityCard key={index} {...feature} />
                ))}
            </div>

            {/* Compliance Coverage */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-8"
            >
                <h3 className="text-3xl font-bold mb-8 text-center">
                    <span className="text-cyber-accent">Compliance</span> Framework Coverage
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {complianceFrameworks.map((framework, index) => (
                        <motion.div
                            key={framework.name}
                            className="glass-strong rounded-lg p-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Award className="w-8 h-8 text-cyber-green" />
                                <span className="text-2xl font-bold text-cyber-accent">{framework.coverage}%</span>
                            </div>
                            <h4 className="font-semibold text-lg mb-3">{framework.name}</h4>
                            <div className="h-2 bg-cyber-border rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-cyber-green to-cyber-accent"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${framework.coverage}%` }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
