"use client";

import { motion } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Features", href: "#features" },
        { name: "AI Security", href: "#ai-security" },
        { name: "Threat Intel", href: "#threat-intel" },
        { name: "Zero Trust", href: "#zero-trust" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-cyber-border"
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.a
                        href="/"
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src="/logo.png"
                            alt="Futuristic Kenya Logo"
                            className="w-10 h-10 object-contain rounded-lg"
                        />
                        <span className="text-xl font-bold">
                            <span className="text-gradient">Futuristic</span>
                            <span className="text-cyber-green ml-1">Kenya</span>
                        </span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-cyber-accent transition-colors"
                                whileHover={{ y: -2 }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                        <motion.a
                            href="/login"
                            className="px-4 py-2 bg-gradient-cyber rounded-lg font-semibold text-black"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.a>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="md:hidden py-4 space-y-4"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block text-gray-300 hover:text-cyber-accent transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="/login"
                            className="block px-4 py-2 bg-gradient-cyber rounded-lg font-semibold text-black text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get Started
                        </a>
                    </motion.div>
                )}
            </nav>
        </motion.header>
    );
}
