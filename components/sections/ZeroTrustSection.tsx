"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Key, Eye, Network, FileCheck } from "lucide-react";
import SecurityCard from "../ui/SecurityCard";
import CodeBlock from "../ui/CodeBlock";
import { codeExamples } from "@/lib/mock-data";
import { fadeInUp } from "@/lib/animations";

export default function ZeroTrustSection() {
    const principles = [
        {
            icon: <Key className="w-12 h-12" />,
            title: "Identity-First Security",
            description: "Verify every user, device, and application before granting access. Strong authentication and authorization at every layer.",
        },
        {
            icon: <Eye className="w-12 h-12" />,
            title: "Continuous Verification",
            description: "Never trust, always verify. Real-time validation of access requests based on context and risk assessment.",
        },
        {
            icon: <Network className="w-12 h-12" />,
            title: "Micro-Segmentation",
            description: "Isolate workloads and create secure zones. Contain breaches and limit lateral movement across your network.",
        },
        {
            icon: <FileCheck className="w-12 h-12" />,
            title: "Policy Enforcement",
            description: "Granular access controls based on role, device health, location, and behavior patterns. Dynamic policy adaptation.",
        },
    ];

    return (
        <section id="zero-trust" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                    <span className="text-gradient-matrix">Zero-Trust</span>
                    <span className="text-white"> Architecture</span>
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-xl text-gray-300 max-w-3xl mx-auto"
                >
                    Never trust, always verify. Implement identity-centric security with continuous authentication
                </motion.p>
            </motion.div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {principles.map((principle, index) => (
                    <SecurityCard key={index} {...principle} />
                ))}
            </div>

            {/* Access Flow Diagram */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-8 mb-16"
            >
                <h3 className="text-2xl font-bold mb-8 text-center text-cyber-accent">
                    Zero-Trust Access Request Flow
                </h3>

                <div className="relative">
                    {/* Flow Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {[
                            { icon: Key, label: "Authentication", desc: "Verify identity" },
                            { icon: ShieldCheck, label: "Device Check", desc: "Validate device" },
                            { icon: Eye, label: "Risk Analysis", desc: "Assess threats" },
                            { icon: FileCheck, label: "Policy Check", desc: "Evaluate rules" },
                            { icon: Lock, label: "Access Grant", desc: "Limited scope" },
                        ].map((step, index) => (
                            <motion.div
                                key={step.label}
                                className="relative"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                            >
                                <div className="glass-strong rounded-lg p-6 text-center hover:border-cyber-accent transition-all h-full flex flex-col items-center justify-center">
                                    <step.icon className="w-10 h-10 text-cyber-accent mb-3" />
                                    <div className="font-semibold mb-1">{step.label}</div>
                                    <div className="text-xs text-gray-400">{step.desc}</div>
                                </div>

                                {/* Arrow for desktop */}
                                {index < 4 && (
                                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-cyber-accent text-2xl z-10">
                                        →
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Code Example */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h3 className="text-3xl font-bold mb-8 text-center">
                    Zero-Trust <span className="text-cyber-green">Authentication</span> Implementation
                </h3>
                <CodeBlock
                    code={codeExamples.zeroTrust}
                    language="typescript"
                    title="zero-trust-auth.ts"
                />
            </motion.div>

            {/* Trust Score Meter */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 glass rounded-xl p-8"
            >
                <h3 className="text-2xl font-bold mb-6 text-center">Real-Time Trust Score</h3>

                <div className="max-w-2xl mx-auto">
                    {["Identity Verification", "Device Compliance", "Location Trust", "Behavioral Analysis"].map(
                        (factor, index) => {
                            const score = [95, 88, 92, 85][index];
                            return (
                                <motion.div
                                    key={factor}
                                    className="mb-6"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium">{factor}</span>
                                        <span className="text-sm font-bold text-cyber-accent">{score}%</span>
                                    </div>
                                    <div className="h-3 bg-cyber-border rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-cyber-green to-cyber-accent"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${score}%` }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        }
                    )}

                    <div className="mt-8 pt-8 border-t border-cyber-border text-center">
                        <div className="text-5xl font-bold text-gradient mb-2">90%</div>
                        <div className="text-gray-400">Overall Trust Score</div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
