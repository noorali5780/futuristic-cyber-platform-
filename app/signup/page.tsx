"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Mail, ArrowLeft, Github, Chrome, User, AlertCircle, CheckCircle } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Sanitize inputs
        const sanitizedName = name.trim();
        const sanitizedEmail = email.toLowerCase().trim();
        const sanitizedPassword = password.trim();

        // Client-side validation
        if (!sanitizedName || !sanitizedEmail || !sanitizedPassword) {
            setError("All fields are required");
            return;
        }

        // Validate name length
        if (sanitizedName.length < 2) {
            setError("Name must be at least 2 characters");
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

        if (!agreedToTerms) {
            setError("Please agree to the Terms of Service");
            return;
        }

        setIsLoading(true);

        try {
            // Register the user with sanitized inputs
            const registerResponse = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: sanitizedName,
                    email: sanitizedEmail,
                    password: sanitizedPassword
                }),
            });

            const registerData = await registerResponse.json();

            if (!registerResponse.ok) {
                setError(registerData.error || "Registration failed");
                setIsLoading(false);
                return;
            }

            // Redirect to login page with success message
            router.push("/login?registered=true");
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
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyber-green/10 blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyber-accent/10 blur-[100px]"
                />
            </div>

            {/* Sign Up Card */}
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
                            <Shield className="w-8 h-8 text-cyber-green" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                        <p className="text-gray-400">Join <span className="text-gradient">Futuristic Kenya</span> today</p>
                    </div>

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
                            <span className="px-2 bg-[#0f0f1a] text-gray-400">Or register with email</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg pl-10 pr-4 py-3 focus:border-cyber-green focus:ring-1 focus:ring-cyber-green focus:outline-none transition-all placeholder-gray-600"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg pl-10 pr-4 py-3 focus:border-cyber-green focus:ring-1 focus:ring-cyber-green focus:outline-none transition-all placeholder-gray-600"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-cyber-bg border border-cyber-border rounded-lg pl-10 pr-4 py-3 focus:border-cyber-green focus:ring-1 focus:ring-cyber-green focus:outline-none transition-all placeholder-gray-600"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="w-4 h-4 rounded border-cyber-border bg-cyber-bg text-cyber-green focus:ring-cyber-green"
                            />
                            <span className="text-sm text-gray-400">I agree to the <a href="#" className="text-cyber-green hover:underline">Terms of Service</a></span>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="block w-full text-center py-3.5 rounded-lg bg-gradient-to-r from-cyber-green to-emerald-600 font-bold text-black hover:shadow-lg hover:shadow-cyber-green/20 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Creating Account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-sm text-gray-400">
                        Already have an account?
                        <Link href="/login" className="text-cyber-green hover:text-white ml-1 font-medium transition-colors">Sign in</Link>
                    </p>
                </div>

                <p className="text-center mt-6 text-xs text-gray-500">
                    Secure enterprise-grade registration.
                    <br />
                    © 2025 Manilla Inc.
                </p>
            </motion.div>
        </main>
    )
}
