"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, AlertCircle, TrendingUp, Shield as ShieldIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { threatFeed, socMetrics } from "@/lib/mock-data";

export default function ThreatFeed() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const interval = setInterval(() => {
            setIsVisible(false);
            timeoutId = setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % threatFeed.length);
                setIsVisible(true);
            }, 300);
        }, 4000);

        return () => {
            clearInterval(interval);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "critical":
                return "text-red-500 border-red-500";
            case "high":
                return "text-orange-500 border-orange-500";
            case "medium":
                return "text-yellow-500 border-yellow-500";
            default:
                return "text-blue-500 border-blue-500";
        }
    };

    const currentThreat = threatFeed[currentIndex];

    return (
        <div className="glass rounded-xl p-6 border-cyber-accent/30">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyber-accent" />
                    Live Threat Feed
                </h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                    <span className="text-sm text-gray-400">Active</span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        key={currentThreat.id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="flex items-start gap-4">
                            <div
                                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getSeverityColor(
                                    currentThreat.severity
                                )}`}
                            >
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`font-semibold ${getSeverityColor(currentThreat.severity).split(" ")[0]}`}>
                                        {currentThreat.type}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(currentThreat.timestamp).toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' })}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300">{currentThreat.description}</p>
                                <div className="mt-2 text-xs text-gray-500">
                                    Source: {currentThreat.source}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {threatFeed.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 flex-1 rounded-full transition-colors ${idx === currentIndex ? "bg-cyber-accent" : "bg-cyber-border"
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function SOCDashboard() {
    const metrics = [
        {
            label: "Threats Blocked",
            value: socMetrics.threatsBlocked.toLocaleString(),
            icon: ShieldIcon,
            color: "text-cyber-green",
            trend: "+12%",
        },
        {
            label: "Active Alerts",
            value: socMetrics.activeAlerts,
            icon: AlertCircle,
            color: "text-orange-500",
            trend: "-5%",
        },
        {
            label: "Security Score",
            value: socMetrics.securityScore + "%",
            icon: TrendingUp,
            color: "text-cyber-accent",
            trend: "+2%",
        },
        {
            label: "System Uptime",
            value: socMetrics.uptime + "%",
            icon: Activity,
            color: "text-cyber-green",
            trend: "0%",
        },
    ];

    return (
        <div className="glass rounded-xl p-6 border-cyber-accent/30">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyber-accent" />
                SOC Dashboard
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        className="glass-strong rounded-lg p-4 hover:border-cyber-accent/50 transition-all"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <metric.icon className={`w-5 h-5 ${metric.color}`} />
                            <span
                                className={`text-xs font-semibold ${metric.trend.startsWith("+") ? "text-green-500" : metric.trend.startsWith("-") ? "text-red-500" : "text-gray-500"
                                    }`}
                            >
                                {metric.trend}
                            </span>
                        </div>
                        <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                            {metric.value}
                        </div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-cyber-border space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Mean Time to Detect</span>
                    <span className="text-cyber-accent font-semibold">{socMetrics.meanTimeToDetect}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Mean Time to Respond</span>
                    <span className="text-cyber-accent font-semibold">{socMetrics.meanTimeToRespond}</span>
                </div>
            </div>
        </div>
    );
}
