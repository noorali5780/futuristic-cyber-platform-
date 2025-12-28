"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Terminal, AlertCircle } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Sanitize inputs
        const sanitizedEmail = email.toLowerCase().trim();
        const sanitizedPassword = password.trim();

        // Client-side validation
        if (!sanitizedEmail || !sanitizedPassword) {
            setError("Command identity and access key are required");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sanitizedEmail)) {
            setError("Invalid command identity format");
            return;
        }

        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email: sanitizedEmail,
                password: sanitizedPassword,
                isAdmin: "true",
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid admin credentials. Access denied.");
            } else {
                router.push("/admin/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Authentication system error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cyber-bg relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 glass-strong rounded-2xl border border-cyber-border shadow-2xl relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-cyber-card border border-cyber-accent flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(244,114,182,0.3)]">
                        <Shield className="w-8 h-8 text-cyber-accent" />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-cyber">
                        Admin Console
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">Restricted Access Only</p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-mono">{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">
                            Command Identity
                        </label>
                        <div className="relative group">
                            <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyber-accent transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@futuristic.ke"
                                className="w-full bg-cyber-bg/50 border border-cyber-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all text-white placeholder-gray-600"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold ml-1">
                            Access Key
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyber-accent transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full bg-cyber-bg/50 border border-cyber-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all text-white placeholder-gray-600"
                                required
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-gradient-cyber p-3 rounded-lg font-bold text-white shadow-lg hover:shadow-cyber-accent/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Authenticating...
                            </>
                        ) : (
                            "Initialize Session"
                        )}
                    </motion.button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>Secure Connection via TLS 1.3</p>
                    <p className="mt-1">All Access Attempts Are Logged</p>
                </div>
            </motion.div>
        </div>
    );
}
