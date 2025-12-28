import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Settings, User, CreditCard, Bell, Shield, Key } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect('/login');
    }

    // Calculate Plan Duration
    const createdAt = new Date(session.user.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const daysActive = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalDays = 30;
    const remainingDays = Math.max(0, totalDays - daysActive);
    const progressPercent = Math.min(100, (daysActive / totalDays) * 100);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Settings className="w-6 h-6 text-cyber-accent" />
                Account Settings
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Card */}
                <div className="glass p-6 rounded-xl border border-cyber-border">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-cyber-blue" />
                        Profile Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1 uppercase font-bold">Full Name</label>
                            <div className="p-3 bg-cyber-bg border border-cyber-border rounded-lg text-white font-medium">
                                {session.user.name}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1 uppercase font-bold">Email Address</label>
                            <div className="p-3 bg-cyber-bg border border-cyber-border rounded-lg text-white font-medium">
                                {session.user.email}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1 uppercase font-bold">Account Type</label>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded text-xs font-bold border ${session.user.role === 'admin'
                                    ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                    : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                    }`}>
                                    {session.user.role.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscription Plan */}
                <div className="glass p-6 rounded-xl border border-cyber-border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Shield className="w-32 h-32 text-cyber-accent" />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-cyber-accent" />
                        Subscription Plan
                    </h2>

                    <div className="relative z-10">
                        <div className="mb-4">
                            <p className="text-sm text-gray-400">Current Plan</p>
                            <p className="text-2xl font-bold text-cyber-accent">Pro Protection</p>
                        </div>

                        <div className="w-full bg-cyber-bg h-2 rounded-full overflow-hidden mb-2">
                            <div
                                className="bg-cyber-accent h-full transition-all duration-1000"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-400 flex justify-between">
                            <span>{daysActive} days active</span>
                            <span className={remainingDays < 5 ? "text-red-400 font-bold" : "text-cyber-accent"}>
                                {remainingDays} days remaining
                            </span>
                        </p>

                        <button className="mt-6 w-full py-2 bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent rounded-lg hover:bg-cyber-accent hover:text-white transition-all font-bold text-sm">
                            Manage Subscription
                        </button>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="glass p-6 rounded-xl border border-cyber-border">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Key className="w-5 h-5 text-cyber-purple" />
                        Security Preferences
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-cyber-bg/50 rounded-lg border border-cyber-border">
                            <div>
                                <p className="text-sm font-bold text-white">Password</p>
                                <p className="text-xs text-gray-500">Last changed 30 days ago</p>
                            </div>
                            <button className="text-xs text-cyber-blue hover:text-white underline">Update</button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-cyber-bg/50 rounded-lg border border-cyber-border">
                            <div>
                                <p className="text-sm font-bold text-white">Two-Factor Authentication</p>
                                <p className="text-xs text-gray-500">Not enabled</p>
                            </div>
                            <button className="px-3 py-1 bg-cyber-bg border border-cyber-border hover:border-gray-500 rounded text-xs text-gray-300">Enable</button>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="glass p-6 rounded-xl border border-cyber-border">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-cyber-green" />
                        Notifications
                    </h2>
                    <div className="space-y-3">
                        {['Security Alerts', 'Weekly Reports', 'Marketing Emails'].map((item) => (
                            <div key={item} className="flex items-center justify-between">
                                <span className="text-sm text-gray-300">{item}</span>
                                <div className="w-10 h-5 bg-cyber-accent rounded-full relative cursor-pointer opacity-80 hover:opacity-100">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
