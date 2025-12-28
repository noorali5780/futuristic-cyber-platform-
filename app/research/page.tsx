"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Microscope, BrainCircuit, Network, ShieldAlert } from "lucide-react";

export default function ResearchPage() {
    const papers = [
        { title: "Adversarial AI Defense Mechanisms", date: "Jan 2025", type: "Technical Paper", icon: BrainCircuit },
        { title: "Quantum-Resistant Cryptography", date: "Dec 2024", type: "Whitepaper", icon: Microscope },
        { title: "Blockchain Security Protocols", date: "Nov 2024", type: "Research Note", icon: Network },
        { title: "Zero-Day Analysis: Kernel Exploits", date: "Oct 2024", type: "Threat Report", icon: ShieldAlert },
    ];

    return (
        <main className="relative overflow-x-hidden min-h-screen">
            <Header />

            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold mb-6">
                        <span className="text-gradient">Security Research</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Pioneering research into emerging threats and defense technologies
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {papers.map((paper, index) => (
                        <motion.div
                            key={paper.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-xl border-l-4 border-l-cyber-purple hover:bg-cyber-card/50 transition-colors cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <paper.icon className="w-8 h-8 text-cyber-purple" />
                                <span className="text-xs px-2 py-1 rounded bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30">{paper.type}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{paper.title}</h3>
                            <p className="text-gray-500 text-sm">Published: {paper.date}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
