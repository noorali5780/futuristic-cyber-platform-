"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="relative overflow-x-hidden min-h-screen">
            <Header />

            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-block p-1 rounded-full bg-gradient-cyber mb-6">
                            <div className="bg-cyber-bg rounded-full px-4 py-1">
                                <span className="text-cyber-accent text-sm font-semibold">Contact Us</span>
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold mb-6">
                            Let&apos;s Secure Your <span className="text-gradient">Future</span>
                        </h1>
                        <p className="text-gray-400 text-xl mb-12">
                            Our team of experts is ready to help you navigate the complex landscape of cybersecurity. Reach out to us for a consultation.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-cyber-accent" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email us at</p>
                                    <p className="text-xl font-semibold">security@futuristic.loggin.pro</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-cyber-purple" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Call us</p>
                                    <p className="text-xl font-semibold">+254 711 951 515</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-cyber-red" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Visit us</p>
                                    <p className="text-xl font-semibold">Nairobi, Kenya</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass p-8 rounded-2xl border border-cyber-border"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                <input type="text" className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-4 py-3 focus:border-cyber-accent focus:outline-none transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                <input type="email" className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-4 py-3 focus:border-cyber-accent focus:outline-none transition-colors" placeholder="john@company.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea rows={4} className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-4 py-3 focus:border-cyber-accent focus:outline-none transition-colors" placeholder="Tell us about your security needs..."></textarea>
                            </div>
                            <button className="w-full bg-gradient-cyber text-black font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-cyber-accent/20 transition-all flex items-center justify-center gap-2">
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.form>
                </div>
            </section>

            <Footer />
        </main>
    );
}
