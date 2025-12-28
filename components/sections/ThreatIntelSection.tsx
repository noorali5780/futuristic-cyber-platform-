"use client";

import { motion } from "framer-motion";
import { Target, AlertTriangle, Shield, Activity } from "lucide-react";
import ThreatFeed, { SOCDashboard } from "../interactive/ThreatIntel";
import { killChainStages } from "@/lib/mock-data";
import { fadeInUp } from "@/lib/animations";

export default function ThreatIntelSection() {
    return (
        <section id="threat-intel" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                    <span className="text-gradient">Threat Intelligence</span>
                    <span className="text-white"> & Operations</span>
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-xl text-gray-300 max-w-3xl mx-auto"
                >
                    Real-time threat detection, SOC operations, and attack chain visualization
                </motion.p>
            </motion.div>

            {/* Interactive Demos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <ThreatFeed />
                <SOCDashboard />
            </div>

            {/* Kill Chain Visualization */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-8"
            >
                <div className="flex items-center gap-3 mb-8">
                    <Target className="w-8 h-8 text-cyber-accent" />
                    <h3 className="text-3xl font-bold">Cyber Kill Chain Visualization</h3>
                </div>

                <div className="space-y-4">
                    {killChainStages.map((stage, index) => (
                        <motion.div
                            key={stage.id}
                            className={`relative glass-strong rounded-lg p-6 border-l-4 ${stage.detected
                                    ? "border-cyber-green"
                                    : "border-cyber-red"
                                } hover:border-cyber-accent transition-all`}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 10 }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyber-accent/20 text-cyber-accent font-bold">
                                            {stage.id}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold mb-1">{stage.name}</h4>
                                            <p className="text-sm text-gray-400">{stage.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {stage.detected ? (
                                        <>
                                            <Shield className="w-6 h-6 text-cyber-green" />
                                            <span className="text-sm font-semibold text-cyber-green">Detected</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertTriangle className="w-6 h-6 text-cyber-red" />
                                            <span className="text-sm font-semibold text-cyber-red">At Risk</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="mt-4 h-2 bg-cyber-border rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${stage.detected
                                            ? "bg-gradient-to-r from-cyber-green to-cyber-accent"
                                            : "bg-gradient-to-r from-cyber-red to-orange-500"
                                        }`}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: stage.detected ? "100%" : "0%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Summary Stats */}
                <div className="mt-8 pt-8 border-t border-cyber-border grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-cyber-green mb-1">
                            {killChainStages.filter((s) => s.detected).length}/{killChainStages.length}
                        </div>
                        <div className="text-sm text-gray-400">Stages Covered</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-cyber-accent mb-1">
                            {((killChainStages.filter((s) => s.detected).length / killChainStages.length) * 100).toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-400">Detection Rate</div>
                    </div>
                    <div className="text-center col-span-2 md:col-span-1">
                        <div className="text-3xl font-bold text-cyber-purple mb-1">
                            <Activity className="w-8 h-8 inline animate-pulse" />
                        </div>
                        <div className="text-sm text-gray-400">Real-time Monitoring</div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
