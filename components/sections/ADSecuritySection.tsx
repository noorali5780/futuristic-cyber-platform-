"use client";

import { motion } from "framer-motion";
import { Server, Key, Lock, AlertOctagon, Activity, Network } from "lucide-react";
import SecurityCard from "../ui/SecurityCard";
import CodeBlock from "../ui/CodeBlock";
import { codeExamples } from "@/lib/mock-data";
import { fadeInUp } from "@/lib/animations";

export default function ADSecuritySection() {
    const features = [
        {
            icon: <Network className="w-12 h-12" />,
            title: "AD Attack Surface Mapping",
            description: "Comprehensive domain topology analysis, privilege escalation path detection, and lateral movement prevention.",
        },
        {
            icon: <Key className="w-12 h-12" />,
            title: "Kerberoasting Defense",
            description: "Strong encryption enforcement, service account hardening, and ticket validation to prevent credential theft.",
        },
        {
            icon: <Lock className="w-12 h-12" />,
            title: "Pass-the-Hash Prevention",
            description: "Credential protection, NTLM authentication restriction, and privileged access management.",
        },
        {
            icon: <Activity className="w-12 h-12" />,
            title: "Detection Engineering",
            description: "Advanced threat hunting, anomaly detection, and real-time correlation of authentication events.",
        },
    ];

    const attackVectors = [
        { name: "Golden Ticket", risk: 95, mitigated: true },
        { name: "Silver Ticket", risk: 88, mitigated: true },
        { name: "DCSync", risk: 92, mitigated: true },
        { name: "Pass-the-Ticket", risk: 85, mitigated: false },
        { name: "Kerberoasting", risk: 90, mitigated: true },
        { name: "AS-REP Roasting", risk: 80, mitigated: false },
    ];

    return (
        <section id="ad-security" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                    <span className="text-gradient">Active Directory</span>
                    <span className="text-white"> Security</span>
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-xl text-gray-300 max-w-3xl mx-auto"
                >
                    Defend against advanced AD attacks with proactive detection and hardening strategies
                </motion.p>
            </motion.div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {features.map((feature, index) => (
                    <SecurityCard key={index} {...feature} />
                ))}
            </div>

            {/* Attack Vector Matrix */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-8 mb-16"
            >
                <div className="flex items-center gap-3 mb-8">
                    <AlertOctagon className="w-8 h-8 text-cyber-red" />
                    <h3 className="text-3xl font-bold">AD Attack Vector Coverage</h3>
                </div>

                <div className="space-y-4">
                    {attackVectors.map((vector, index) => (
                        <motion.div
                            key={vector.name}
                            className="glass-strong rounded-lg p-6"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-4">
                                    <Server className="w-6 h-6 text-cyber-accent" />
                                    <span className="font-semibold text-lg">{vector.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-400">Risk Level: {vector.risk}%</span>
                                    {vector.mitigated ? (
                                        <span className="px-3 py-1 bg-cyber-green/20 text-cyber-green rounded-full text-xs font-semibold border border-cyber-green">
                                            MITIGATED
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-cyber-red/20 text-cyber-red rounded-full text-xs font-semibold border border-cyber-red">
                                            AT RISK
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Risk bar */}
                            <div className="h-2 bg-cyber-border rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${vector.mitigated ? "bg-gradient-to-r from-cyber-green to-cyber-accent" : "bg-gradient-to-r from-cyber-red to-orange-500"}`}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${vector.risk}%` }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 pt-8 border-t border-cyber-border grid grid-cols-3 gap-6 text-center">
                    <div>
                        <div className="text-3xl font-bold text-cyber-green mb-1">
                            {attackVectors.filter((v) => v.mitigated).length}/{attackVectors.length}
                        </div>
                        <div className="text-sm text-gray-400">Vectors Mitigated</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-cyber-accent mb-1">
                            {((attackVectors.filter((v) => v.mitigated).length / attackVectors.length) * 100).toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-400">Protection Coverage</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-cyber-purple mb-1">24/7</div>
                        <div className="text-sm text-gray-400">Monitoring</div>
                    </div>
                </div>
            </motion.div>

            {/* Kerberos Security Code */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h3 className="text-3xl font-bold mb-8 text-center">
                    <span className="text-cyber-green">Kerberos Ticket</span> Validation
                </h3>
                <CodeBlock
                    code={codeExamples.adSecurity}
                    language="typescript"
                    title="kerberos-validation.ts"
                />
            </motion.div>
        </section>
    );
}
