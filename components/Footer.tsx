"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
    const sections = [
        {
            title: "Security Domains",
            links: [
                { name: "AI Security", href: "#ai-security" },
                { name: "Zero Trust", href: "#zero-trust" },
                { name: "Threat Intelligence", href: "#threat-intel" },
                { name: "Active Directory", href: "#ad-security" },
            ],
        },
        {
            title: "Resources",
            links: [
                { name: "Documentation", href: "/documentation" },
                { name: "Case Studies", href: "/case-studies" },
                { name: "Research", href: "/research" },
                { name: "Blog", href: "/blog" },
            ],
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Contact", href: "/contact" },
                { name: "Partners", href: "/partners" },
            ],
        },
    ];

    const socials = [
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Mail, href: "mailto:info@futuristickenya.com", label: "Email" },
    ];

    return (
        <footer className="bg-cyber-card border-t border-cyber-border mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <h3 className="text-2xl font-bold mb-4">
                            <span className="text-gradient">Futuristic</span>
                            <span className="text-cyber-green ml-1">Kenya</span>
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Military-grade cybersecurity engineered in Africa for global deployment.
                        </p>
                        <div className="flex space-x-4">
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    className="text-gray-400 hover:text-cyber-accent transition-colors"
                                    whileHover={{ y: -3 }}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-lg font-semibold mb-4 text-cyber-accent">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-cyber-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 Futuristic Kenya. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm mt-2 md:mt-0">
                        Developed by <span className="text-cyber-accent">Sadiki A. Noor</span> | <span className="text-cyber-green">Manilla Inc</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
