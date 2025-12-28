"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Network, Server, Shield, Database, Cloud } from "lucide-react";

export default function PartnersPage() {
    const partners = [
        { name: "CloudDefend", icon: Cloud, type: "Cloud Security Partner" },
        { name: "BlockChain Secure", icon: Database, type: "Blockchain Infrastructure" },
        { name: "NetGuard", icon: Network, type: "Network Solutions" },
        { name: "CyberShield", icon: Shield, type: "Endpoint Protection" },
        { name: "ServerCore", icon: Server, type: "Data Center Security" },
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
                        Strategic <span className="text-gradient">Partners</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Collaborating with industry leaders to deliver comprehensive security ecosystems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-xl text-center hover:border-cyber-accent transition-colors group cursor-pointer"
                        >
                            <partner.icon className="w-12 h-12 text-gray-500 mx-auto mb-4 group-hover:text-cyber-accent transition-colors" />
                            <h3 className="font-bold mb-1">{partner.name}</h3>
                            <p className="text-xs text-gray-500">{partner.type}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
