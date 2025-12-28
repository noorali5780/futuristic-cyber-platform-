"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Mail, ArrowLeft, Github, Chrome, AlertCircle } from "lucide-react";
import Link from 'next/link';
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginSuccessMessage() {
    const searchParams = useSearchParams();
    const isRegistered = searchParams.get("registered") === "true";

    if (!isRegistered) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2 text-green-400"
        >
            <Shield className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Account created successfully. Please sign in.</span>
        </motion.div>
    );
}

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Sanitize inputs
        const sanitizedEmail = email.toLowerCase().trim();
        const sanitizedPassword = password.trim();

        // Client-side validation
        if (!sanitizedEmail || !sanitizedPassword) {
            setError("Email and password are required");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sanitizedEmail)) {
            setError("Please enter a valid email address");
            return;
        }

        // Validate password length
        if (sanitizedPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email: sanitizedEmail,
                password: sanitizedPassword,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuthLogin = (provider: string) => {
        signIn(provider, { callbackUrl: "/dashboard" });
    };

    return (
        <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-cyber-bg p-4">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-bg via-transparent to-cyber-bg/90" />

                {/* Animated Circles */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyber-accent/10 blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyber-purple/10 blur-[100px]"
                />
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass p-8 rounded-2xl border border-cyber-border shadow-2xl backdrop-blur-xl">
                    {/* Back Link */}
                    <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Link>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 rounded-full bg-cyber-card border border-cyber-border mb-4">
                            <Shield className="w-8 h-8 text-cyber-accent" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Secure access to <span className="text-gradient">Futuristic Kenya</span></p>
                    </div>

                    {/* Success Message Wrapped in Suspense */}
                    <Suspense fallback={null}>
                        <LoginSuccessMessage />
                    </Suspense>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </motion.div>
                    )}

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                            onClick={() => handleOAuthLogin("github")}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-cyber-border hover:bg-cyber-card/50 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                            <span className="text-sm font-medium">Github</span>
                        </button>
                        <button
                            onClick={() => handleOAuthLogin("google")}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-cyber-border hover:bg-cyber-card/50 transition-colors"
                        >
                            <Chrome className="w-5 h-5 text-cyber-blue" />
                            <span className="text-sm font-medium">Google</span>
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-cyber-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#0f0f1a] text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg pl-10 pr-4 py-3 focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent focus:outline-none transition-all placeholder-gray-600"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-gray-400">Password</label>
                                <a href="#" className="text-xs text-cyber-accent hover:text-cyber-green transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg pl-10 pr-4 py-3 focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent focus:outline-none transition-all placeholder-gray-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="block w-full text-center py-3.5 rounded-lg bg-gradient-cyber font-bold text-black hover:shadow-lg hover:shadow-cyber-accent/20 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-sm text-gray-400">
                        Don&apos;t have an account?
                        <Link href="/signup" className="text-cyber-accent hover:text-white ml-1 font-medium transition-colors">Sign up</Link>
                    </p>
                </div>

                <p className="text-center mt-6 text-xs text-gray-500">
                    Protected by futuristic high-grade encryption.
                    <br />
                    © 2025 Manilla Inc.
                </p>
            </motion.div>
        </main>
    );
}
