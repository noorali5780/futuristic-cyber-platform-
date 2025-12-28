"use client";

import { motion } from "framer-motion";
import { Users, ShieldAlert, Globe, Cpu, ArrowUpRight, ArrowDownRight, Search, Activity, MoreHorizontal, Bell } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardClientProps {
    stats: {
        totalUsers: number;
        totalWebsites: number;
        activeWebsites: number;
        threatsDetected: number;
    };
    recentUsers: any[];
    logs: any[];
}

const chartData = [
    { name: '00:00', scans: 40, threats: 2 },
    { name: '04:00', scans: 30, threats: 1 },
    { name: '08:00', scans: 85, threats: 5 },
    { name: '12:00', scans: 120, threats: 8 },
    { name: '16:00', scans: 90, threats: 4 },
    { name: '20:00', scans: 65, threats: 3 },
    { name: '23:59', scans: 45, threats: 2 },
];

export default function AdminDashboardClient({ stats, recentUsers, logs }: AdminDashboardClientProps) {
    const statCards = [
        {
            label: "Total Users",
            value: stats.totalUsers,
            change: "+12%",
            isPositive: true,
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-400/10"
        },
        {
            label: "Monitored Sites",
            value: stats.totalWebsites,
            change: "+5%",
            isPositive: true,
            icon: Globe,
            color: "text-cyber-green",
            bg: "bg-cyber-green/10"
        },
        {
            label: "Active Threats",
            value: stats.threatsDetected,
            change: stats.threatsDetected > 0 ? "+1" : "0",
            isPositive: stats.threatsDetected === 0,
            icon: ShieldAlert,
            color: "text-red-400",
            bg: "bg-red-400/10"
        },
        {
            label: "System Health",
            value: "98%",
            change: "Stable",
            isPositive: true,
            icon: Activity,
            color: "text-cyber-accent",
            bg: "bg-cyber-accent/10"
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Security Command Center</h1>
                    <p className="text-gray-400 text-sm">Real-time system monitoring</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input type="text" placeholder="Global Search..." className="bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-cyber-accent w-64" />
                    </div>
                    <button className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-gray-400 hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass p-6 rounded-xl border border-cyber-border hover:border-cyber-accent/30 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                                }`}>
                                {stat.change}
                                {stat.isPositive ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                        <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Chart Section */}
                <div className="lg:col-span-2 glass rounded-xl border border-cyber-border p-6">
                    <h3 className="font-bold text-lg mb-6">Scan Activity (24h)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="scans" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorScans)" />
                                <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* New Users List */}
                <div className="glass rounded-xl border border-cyber-border overflow-hidden">
                    <div className="p-6 border-b border-cyber-border flex justify-between items-center">
                        <h3 className="font-bold text-lg">New Users</h3>
                        <button className="text-cyber-accent hover:text-white transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        {recentUsers.length === 0 ? (
                            <p className="text-gray-500 text-center">No users found</p>
                        ) : (
                            recentUsers.map((user: any, i: number) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-cyber-card border border-cyber-border flex items-center justify-center text-sm font-bold text-gray-300 uppercase">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-white">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full bg-cyber-green`} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Logs Table */}
            <div className="glass rounded-xl border border-cyber-border overflow-hidden">
                <div className="p-6 border-b border-cyber-border">
                    <h3 className="font-bold text-lg">Recent System Logs</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-900/50 text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="p-4">Time</th>
                                <th className="p-4">Level</th>
                                <th className="p-4">Message</th>
                                <th className="p-4">Meta</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-zinc-800">
                            {logs.length === 0 ? (
                                <tr><td colSpan={4} className="p-4 text-center text-gray-500">No logs found</td></tr>
                            ) : (
                                logs.map((log: any) => (
                                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-mono text-gray-400 whitespace-nowrap">
                                            {new Date(log.timestamp).toLocaleTimeString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${log.level === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                    log.level === 'warn' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                }`}>
                                                {log.level.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-200">{log.message}</td>
                                        <td className="p-4 text-gray-500 text-xs font-mono max-w-xs truncate">
                                            {log.meta ? JSON.stringify(log.meta) : '-'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
