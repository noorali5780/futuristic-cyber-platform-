"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Lock, Eye, Database, Network } from "lucide-react";
import FeatureBadge from "../ui/FeatureBadge";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useEffect, useState } from "react";

const Particles = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyber-accent rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: Math.random(),
                    }}
                    animate={{
                        y: [null, Math.random() * window.innerHeight],
                        opacity: [null, Math.random(), 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </>
    );
};

export default function Hero() {
    const badges = [
        "AI Security",
        "Zero Trust",
        "Pentesting",
        "SOC Operations",
        "Threat Intel",
        "Cloud Security",
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Animated background grid */}
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-bg/50 to-cyber-bg" />

            {/* Floating particles */}
            <div className="absolute inset-0">
                <Particles />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-8"
                >
                    {/* Main Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                    >
                        <span className="block text-gradient neon-text">
                            Secure the
                        </span>
                        <span className="block mt-2">
                            <span className="text-gradient-matrix neon-text">Future</span>
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
                    >
                        Military-grade cybersecurity engineered in Africa. From AI security
                        to Zero-Trust architecture, we protect what matters most.
                    </motion.p>

                    {/* Feature badges */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
                    >
                        {badges.map((badge, index) => (
                            <motion.div
                                key={badge}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <FeatureBadge text={badge} />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                    >
                        <motion.a
                            href="#features"
                            className="px-8 py-4 bg-gradient-cyber rounded-lg font-bold text-lg text-black hover:shadow-2xl transition-shadow"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.6)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Features
                        </motion.a>
                        <motion.a
                            href="#contact"
                            className="px-8 py-4 glass border-2 border-cyber-accent rounded-lg font-bold text-lg hover:bg-cyber-accent/10 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Us
                        </motion.a>
                    </motion.div>

                    {/* Floating icons */}
                    <div className="relative h-40 mt-16">
                        {[Shield, Zap, Lock, Eye, Database, Network].map((Icon, index) => (
                            <motion.div
                                key={index}
                                className="absolute text-cyber-accent opacity-20"
                                style={{
                                    left: `${(index * 20) % 100}%`,
                                    top: `${(index * 30) % 100}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    rotate: [0, 360],
                                    opacity: [0.2, 0.5, 0.2],
                                }}
                                transition={{
                                    duration: 8 + index,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Icon className="w-16 h-16" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-cyber-accent rounded-full flex justify-center">
                    <motion.div
                        className="w-1 h-2 bg-cyber-accent rounded-full mt-2"
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
