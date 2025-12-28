"use client";

import { useState, useEffect } from "react";
import { Globe, Plus, Loader2, CheckCircle2, XCircle, Shield, AlertTriangle, FileDown } from "lucide-react";
import { motion } from "framer-motion";

export default function WebsitesPage() {
    const [websites, setWebsites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form state
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const fetchWebsites = async () => {
        try {
            const res = await fetch("/api/websites");
            if (res.ok) {
                const data = await res.json();
                setWebsites(data);
            }
        } catch (error) {
            console.error("Failed to fetch websites", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebsites();

        // Poll for updates if we have pending sites locally or just generally for live updates
        const interval = setInterval(() => {
            fetchWebsites();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleAddWebsite = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/websites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, name }),
            });

            if (res.ok) {
                setUrl("");
                setName("");
                setShowAddForm(false);
                fetchWebsites(); // Refresh list
            } else {
                const data = await res.json();
                setError(data.error || "Failed to add website");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Monitored Websites</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 bg-cyber-accent hover:bg-cyber-accent/80 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Website
                </button>
            </div>

            {/* Add Website Form */}
            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-6 rounded-xl border border-cyber-border"
                >
                    <h2 className="text-lg font-bold text-white mb-4">Add New Target</h2>
                    <form onSubmit={handleAddWebsite} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Company / Site Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-4 py-2 text-white focus:border-cyber-accent focus:outline-none"
                                    placeholder="e.g. My Portfolio"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Website URL</label>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg px-4 py-2 text-white focus:border-cyber-accent focus:outline-none"
                                    placeholder="e.g. google.com"
                                    required
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-cyber-blue hover:bg-cyber-blue/80 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Start Monitoring"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Websites List */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-cyber-accent animate-spin" />
                </div>
            ) : websites.length === 0 ? (
                <div className="text-center py-12 glass rounded-xl border border-cyber-border">
                    <Globe className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-400">No websites monitored</h3>
                    <p className="text-gray-500 mt-2">Add your first website to start real-time scanning.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {websites.map((site) => (
                        <motion.div
                            key={site.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass p-6 rounded-xl border border-cyber-border hover:border-cyber-accent/30 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${site.status === 'up' ? 'bg-cyber-green/10 text-cyber-green' : 'bg-cyber-red/10 text-cyber-red'}`}>
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{site.name}</h3>
                                        <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyber-blue hover:underline">
                                            {site.url}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-sm">
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 mb-1">Status</span>
                                        <span className={`font-bold flex items-center gap-1 ${site.status === 'up' ? 'text-cyber-green' : 'text-cyber-red'}`}>
                                            {site.status === 'up' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                            {site.status === 'up' ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 mb-1">Latency</span>
                                        <span className="text-white font-mono">{site.latency}ms</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 mb-1">SSL</span>
                                        <span className={`font-bold flex items-center gap-1 ${site.sslValid ? 'text-cyber-green' : 'text-orange-400'}`}>
                                            {site.sslValid ? <Shield className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                            {site.sslValid ? 'Secure' : 'Invalid'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-500 mb-1">Last Scan</span>
                                        <span className="text-gray-300">
                                            {site.lastScanAt ? new Date(site.lastScanAt).toLocaleTimeString() : 'Pending'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => window.open(`/api/websites/${site.id}/report`, '_blank')}
                                        className="p-2 hover:bg-zinc-800 rounded-full text-gray-400 hover:text-cyber-accent transition-colors"
                                        title="Download Security Report"
                                    >
                                        <FileDown className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
