"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Flag, Users, Globe } from "lucide-react";

export default function AboutPage() {
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
                        About <span className="text-gradient">Futuristic Kenya</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        We are a premier cybersecurity firm based in Kenya, dedicated to protecting African digital infrastructure with world-class security solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass p-8 rounded-xl text-center"
                    >
                        <Shield className="w-12 h-12 text-cyber-accent mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-gray-400">To secure the digital future of Africa through advanced technology and expertise.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass p-8 rounded-xl text-center"
                    >
                        <Flag className="w-12 h-12 text-cyber-red mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-gray-400">Establishing a resilient and trusted digital ecosystem for businesses and governments.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass p-8 rounded-xl text-center"
                    >
                        <Globe className="w-12 h-12 text-cyber-green mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-4">Global Standards</h3>
                        <p className="text-gray-400">Implementing international best practices tailored for local challenges.</p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
