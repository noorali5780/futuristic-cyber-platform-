"use client";

import { useEffect, useState } from "react";
import { BarChart3, Activity, ShieldAlert, Zap, Server } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/analytics");
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Activity className="w-8 h-8 text-cyber-accent animate-spin" />
            </div>
        );
    }

    const traffic = data?.traffic || [];
    const threats = data?.threats || { total: 0, breakdown: [] };
    const maxLatency = Math.max(...traffic.map((t: any) => t.latency), 100);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white mb-6">Security Analytics</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-xl border border-cyber-border">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-3 bg-cyber-blue/10 rounded-lg">
                            <Zap className="w-6 h-6 text-cyber-blue" />
                        </div>
                        <span className="text-xs font-bold text-cyber-blue bg-cyber-blue/10 px-2 py-1 rounded">Real-time</span>
                    </div>
                    <div className="mt-2">
                        <h3 className="text-gray-400 text-sm">Avg Latency</h3>
                        <p className="text-2xl font-bold text-white">
                            {traffic.length > 0
                                ? Math.round(traffic.reduce((a: any, b: any) => a + b.latency, 0) / traffic.length)
                                : 0}ms
                        </p>
                    </div>
                </div>

                <div className="glass p-6 rounded-xl border border-cyber-border">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-3 bg-red-400/10 rounded-lg">
                            <ShieldAlert className="w-6 h-6 text-red-400" />
                        </div>
                        <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded">High Severity</span>
                    </div>
                    <div className="mt-2">
                        <h3 className="text-gray-400 text-sm">Threats Detected</h3>
                        <p className="text-2xl font-bold text-white">{threats.total}</p>
                    </div>
                </div>

                <div className="glass p-6 rounded-xl border border-cyber-border">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-3 bg-cyber-green/10 rounded-lg">
                            <Server className="w-6 h-6 text-cyber-green" />
                        </div>
                        <span className="text-xs font-bold text-cyber-green bg-cyber-green/10 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="mt-2">
                        <h3 className="text-gray-400 text-sm">Monitored Points</h3>
                        <p className="text-2xl font-bold text-white">{data?.systemContext?.monitoredSites || 0}</p>
                    </div>
                </div>
            </div>

            {/* Traffic Chart (Custom SVG Animation) */}
            <div className="glass p-6 rounded-xl border border-cyber-border overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-white">Network Traffic & Latency</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyber-accent"></div>
                        <span className="text-xs text-gray-400">Response Time (ms)</span>
                    </div>
                </div>

                <div className="relative h-64 w-full flex items-end justify-between gap-1">
                    {traffic.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            No traffic data available yet. Add a website to start monitoring.
                        </div>
                    ) : (
                        traffic.map((point: any, i: number) => {
                            const height = (point.latency / maxLatency) * 100;
                            return (
                                <div key={i} className="flex-1 flex flex-col justify-end group relative">
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-cyber-border text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10">
                                        {point.latency}ms at {point.time}
                                    </div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${Math.max(height, 5)}%` }}
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                        className={`w-full max-w-[20px] mx-auto rounded-t-sm ${point.latency > 200 ? 'bg-red-400' : 'bg-cyber-accent/60 hover:bg-cyber-accent'
                                            } transition-colors`}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
                {/* X-Axis Labels */}
                <div className="flex justify-between mt-2 text-xs text-gray-500 px-2">
                    {traffic.filter((_: any, i: number) => i % 4 === 0).map((t: any, i: number) => (
                        <span key={i}>{t.time}</span>
                    ))}
                </div>
            </div>

            {/* Threat Analysis */}
            <div className="glass p-6 rounded-xl border border-cyber-border">
                <h3 className="font-bold text-lg text-white mb-6">Attack Vector Analysis</h3>
                <div className="space-y-4">
                    {threats.breakdown.length === 0 ? (
                        <p className="text-gray-500 text-sm">System secure. No active attack vectors detected.</p>
                    ) : (
                        threats.breakdown.map((item: any, index: number) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">{item.name}</span>
                                    <span className="text-red-400 font-bold">{item.count} Detected</span>
                                </div>
                                <div className="h-2 bg-cyber-bg rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.count / threats.total) * 100}%` }}
                                        className="h-full bg-red-500"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
