"use client";

import { motion } from "framer-motion";
import { Brain, Shield, AlertTriangle, Database, Lock } from "lucide-react";
import SecurityCard from "../ui/SecurityCard";
import CodeBlock from "../ui/CodeBlock";
import { codeExamples } from "@/lib/mock-data";
import { fadeInUp } from "@/lib/animations";

export default function AISecuritySection() {
    const features = [
        {
            icon: <Brain className="w-12 h-12" />,
            title: "AI Model Abuse Prevention",
            description: "Advanced monitoring and rate limiting to detect and prevent adversarial attacks on AI models in real-time.",
        },
        {
            icon: <AlertTriangle className="w-12 h-12" />,
            title: "Prompt Injection Defense",
            description: "Multi-layer input validation and sanitization to protect against prompt manipulation and jailbreak attempts.",
        },
        {
            icon: <Database className="w-12 h-12" />,
            title: "Data Poisoning Mitigation",
            description: "Integrity verification and anomaly detection to safeguard training data from contamination attacks.",
        },
        {
            icon: <Lock className="w-12 h-12" />,
            title: "Secure AI Pipelines",
            description: "End-to-end encryption and access control for ML model deployment, training, and inference workflows.",
        },
    ];

    return (
        <section id="ai-security" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                    <span className="text-gradient">AI Security</span>
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-xl text-gray-300 max-w-3xl mx-auto"
                >
                    Protect your AI systems from sophisticated attacks with our comprehensive security framework
                </motion.p>
            </motion.div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {features.map((feature, index) => (
                    <SecurityCard key={index} {...feature} />
                ))}
            </div>

            {/* Code Comparison */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16"
            >
                <h3 className="text-3xl font-bold mb-8 text-center">
                    <span className="text-cyber-accent">Prompt Injection</span> Defense in Action
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                            <h4 className="text-lg font-semibold text-red-400">Vulnerable Code</h4>
                        </div>
                        <CodeBlock
                            code={codeExamples.promptInjection.unsafe}
                            language="typescript"
                            title="unsafe-prompt.ts"
                        />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <h4 className="text-lg font-semibold text-green-400">Secure Implementation</h4>
                        </div>
                        <CodeBlock
                            code={codeExamples.promptInjection.safe}
                            language="typescript"
                            title="secure-prompt.ts"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Security Flow Diagram */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 glass rounded-xl p-8"
            >
                <h3 className="text-2xl font-bold mb-8 text-center text-cyber-green">
                    AI Security Pipeline Architecture
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {[
                        "Input Validation",
                        "Threat Detection",
                        "Sanitization",
                        "AI Processing",
                        "Output Filtering",
                    ].map((step, index) => (
                        <motion.div
                            key={step}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="glass rounded-lg px-6 py-4 border-2 border-cyber-accent/50 hover:border-cyber-accent transition-all">
                                <div className="text-sm text-gray-400">Step {index + 1}</div>
                                <div className="font-semibold text-white">{step}</div>
                            </div>
                            {index < 4 && (
                                <div className="hidden md:block text-cyber-accent text-2xl mx-2">→</div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
