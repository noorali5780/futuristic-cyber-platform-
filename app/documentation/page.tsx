"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Book, FileText, Code2, Shield } from "lucide-react";

export default function DocumentationPage() {
    const sections = [
        { title: "Getting Started", icon: Book, desc: "Installation and quick start guide" },
        { title: "API Reference", icon: Code2, desc: "Complete API endpoints and usage" },
        { title: "Security Guide", icon: Shield, desc: "Best practices and security protocols" },
        { title: "Architecture", icon: FileText, desc: "System design and component structure" },
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
                        <span className="text-gradient">Documentation</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Comprehensive guides and resources for the Futuristic Security Platform
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-xl hover:border-cyber-accent transition-colors cursor-pointer group"
                        >
                            <section.icon className="w-10 h-10 text-cyber-accent mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                            <p className="text-gray-400">{section.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
