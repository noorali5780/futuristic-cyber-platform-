"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, MapPin, GraduationCap, ShieldCheck, Terminal, Database, Activity } from "lucide-react";
import Image from "next/image";

export default function PortfolioSection() {
    const roles = [
        { title: "Cyber Security", icon: ShieldCheck, color: "text-cyber-accent" },
        { title: "Penetester", icon: Terminal, color: "text-cyber-red" },
        { title: "Blockchain", icon: Database, color: "text-cyber-purple" },
        { title: "Statistician", icon: Activity, color: "text-cyber-green" },
        { title: "Malware Researcher", icon: ShieldCheck, color: "text-cyber-blue" },
    ];

    return (
        <section id="portfolio" className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-cyber-bg">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyber-bg via-transparent to-cyber-bg/90" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block p-1 rounded-full bg-gradient-cyber mb-6">
                        <div className="bg-cyber-bg rounded-full p-4">
                            <ShieldCheck className="w-16 h-16 text-cyber-accent animate-pulse-slow" />
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">Sadiki A. Noor</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyber-card border border-cyber-border text-sm">
                            <MapPin className="w-3 h-3 text-cyber-red" /> Proudly Kenya
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyber-card border border-cyber-border text-sm">
                            <GraduationCap className="w-3 h-3 text-cyber-accent" /> Kirinyaga University
                        </span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
                    {roles.map((role, index) => (
                        <motion.div
                            key={role.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="glass p-6 rounded-xl flex items-center gap-4 hover:border-cyber-accent transition-colors"
                        >
                            <role.icon className={`w-8 h-8 ${role.color}`} />
                            <span className="text-lg font-semibold">{role.title}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center gap-6"
                >
                    <motion.a
                        href="https://www.linkedin.com/in/sadiki-na-7a4806396/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-4 bg-[#0077b5]/20 border border-[#0077b5]/50 hover:bg-[#0077b5]/40 rounded-lg transition-all group"
                        whileHover={{ y: -5 }}
                    >
                        <Linkedin className="w-6 h-6 text-[#0077b5] group-hover:text-white" />
                        <span className="font-semibold">Connect on LinkedIn</span>
                    </motion.a>

                    <motion.a
                        href="https://github.com/noorali5780"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-4 bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 rounded-lg transition-all group"
                        whileHover={{ y: -5 }}
                    >
                        <Github className="w-6 h-6 text-white" />
                        <span className="font-semibold">View GitHub</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
