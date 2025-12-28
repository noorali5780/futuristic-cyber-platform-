"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Briefcase, Building, Target, Users } from "lucide-react";

export default function CaseStudiesPage() {
    const cases = [
        {
            title: "Financial Sector Zero-Trust",
            client: "Major Regional Bank",
            result: "Reduced attack surface by 92%",
            icon: Building
        },
        {
            title: "Telecom Infrastructure Hardening",
            client: "National Telecom Provider",
            result: "Zero downtime during DDoS attacks",
            icon: Target
        },
        {
            title: "Healthcare Data Protection",
            client: "Hospital Network",
            result: "100% HIPAA Compliance achieved",
            icon: Users
        }
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
                        <span className="text-gradient">Case Studies</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Real-world success stories of securing critical infrastructure
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {cases.map((study, index) => (
                        <motion.div
                            key={study.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="glass p-8 rounded-xl flex items-center gap-6 hover:border-cyber-green transition-colors"
                        >
                            <div className="p-4 bg-cyber-card rounded-lg">
                                <study.icon className="w-8 h-8 text-cyber-green" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-1">{study.title}</h3>
                                <p className="text-cyber-accent text-sm mb-2">{study.client}</p>
                                <p className="text-gray-300">{study.result}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
