"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Activity,
    ShieldCheck,
    Lock,
    Globe,
    ArrowUpRight,
    CheckCircle2,
    AlertTriangle,
    RefreshCw
} from "lucide-react";

export default function ClientDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/stats");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data.stats);
                }
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const metrics = [
        {
            label: "Total Sites Monitored",
            value: stats ? stats.totalSites : "0",
            subtext: "Active monitoring",
            icon: Activity,
            status: "neutral",
            color: "text-cyber-blue",
            bg: "bg-cyber-blue/10"
        },
        {
            label: "Sites Online",
            value: stats ? stats.onlineSites : "0",
            subtext: stats ? `${stats.onlineSites}/${stats.totalSites} active` : "No data",
            icon: ShieldCheck,
            status: stats && stats.onlineSites === stats.totalSites ? "good" : "warning",
            color: "text-cyber-green",
            bg: "bg-cyber-green/10"
        },
        {
            label: "Security Threats",
            value: stats ? stats.threats : "0",
            subtext: stats && stats.threats === 0 ? "System Secure" : "Action Required",
            icon: AlertTriangle,
            status: stats && stats.threats === 0 ? "good" : "danger",
            color: stats && stats.threats === 0 ? "text-cyber-accent" : "text-cyber-red",
            bg: stats && stats.threats === 0 ? "bg-cyber-accent/10" : "bg-cyber-red/10"
        },
        {
            label: "Avg Global Latency",
            value: stats ? `${stats.avgLatency}ms` : "0ms",
            subtext: "Real-time ping",
            icon: Globe,
            status: "neutral",
            color: "text-cyber-purple",
            bg: "bg-cyber-purple/10"
        }
    ];

    return (
        <div className="space-y-6">
            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass p-6 rounded-xl border border-cyber-border hover:border-cyber-accent/30 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${metric.bg} group-hover:scale-110 transition-transform`}>
                                <metric.icon className={`w-6 h-6 ${metric.color}`} />
                            </div>
                            <Activity className="w-4 h-4 text-gray-600" />
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">{metric.label}</h3>
                        <div className="flex items-end gap-2 mt-1">
                            {loading ? (
                                <div className="h-8 w-24 bg-gray-700/50 animate-pulse rounded" />
                            ) : (
                                <p className="text-2xl font-bold text-white">{metric.value}</p>
                            )}
                            <p className="text-xs text-gray-500 mb-1.5">{metric.subtext}</p>
                        </div>

                        {/* Progress bar visual */}
                        <div className="w-full h-1 bg-cyber-bg mt-4 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full ${metric.color.replace('text-', 'bg-')}`}
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Real-time explanation */}
                <div className="glass rounded-xl border border-cyber-border p-6 text-center text-gray-400">
                    <h3 className="text-white font-bold mb-2">Real-Time Data Active</h3>
                    <p>Metrics above reflect real-time monitoring of your added websites. Latency, uptime, and thread detection are performed live.</p>
                </div>
            </div>
        </div>
    );
}
