"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Briefcase, Code, Terminal, Search } from "lucide-react";

export default function CareersPage() {
    const jobs = [
        { title: "Senior Penetration Tester", type: "Full-time", location: "Nairobi, Kenya", icon: Terminal },
        { title: "Security Operations Analyst", type: "Full-time", location: "Remote", icon: Search },
        { title: "DevSecOps Engineer", type: "Contract", location: "Nairobi, Kenya", icon: Code },
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
                        Join the <span className="text-gradient">Elite</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Start your career in cybersecurity with the leading experts in the region.
                    </p>
                </motion.div>

                <div className="space-y-6 max-w-4xl mx-auto">
                    {jobs.map((job, index) => (
                        <motion.div
                            key={job.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-xl flex items-center justify-between hover:border-cyber-blue transition-colors group cursor-pointer"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-cyber-card flex items-center justify-center group-hover:bg-cyber-blue/20 transition-colors">
                                    <job.icon className="w-6 h-6 text-cyber-blue" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{job.title}</h3>
                                    <div className="flex gap-4 text-sm text-gray-400">
                                        <span>{job.type}</span>
                                        <span>•</span>
                                        <span>{job.location}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="px-6 py-2 rounded-full border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white transition-all">
                                Apply Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
