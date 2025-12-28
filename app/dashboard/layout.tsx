"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Activity,
    Shield,
    Settings,
    LogOut,
    BarChart3,
    Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session } = useSession();

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
        { icon: Globe, label: "My Websites", href: "/dashboard/websites" },
        { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
        { icon: Shield, label: "Security Scans", href: "/dashboard/scans" },
        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ];

    const handleSignOut = () => {
        signOut({ callbackUrl: "/login" });
    };

    // Get user initials for avatar
    const userInitials = session?.user?.name
        ? session.user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
        : "U";

    // Calculate Plan Duration for Sidebar
    const userCreatedAt = (session?.user as any)?.createdAt;
    const createdAt = userCreatedAt ? new Date(userCreatedAt) : new Date();
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const daysActive = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalDays = 30;
    const remainingDays = Math.max(0, totalDays - daysActive);
    const progressPercent = Math.min(100, (daysActive / totalDays) * 100);

    return (
        <div className="min-h-screen bg-cyber-bg flex">
            {/* Sidebar */}
            <aside className="w-64 glass-strong border-r border-cyber-border hidden md:flex flex-col fixed h-full z-20">
                <div className="p-6 flex items-center gap-3 border-b border-cyber-border">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-cyber-accent to-cyber-purple flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-wide">Secure<span className="text-cyber-accent">Guard</span></span>
                </div>

                <div className="p-6 pb-2">
                    <div className="glass p-4 rounded-lg border border-cyber-border/50">
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Current Plan</p>
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-cyber-accent">Pro Protection</span>
                        </div>
                        <div className="w-full bg-cyber-bg h-1.5 rounded-full overflow-hidden">
                            <div
                                className="bg-cyber-accent h-full transition-all duration-1000"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 flex justify-between">
                            <span>{daysActive}/30 Days</span>
                            <span className={remainingDays < 5 ? "text-red-400" : ""}>{remainingDays} Left</span>
                        </p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive
                                    ? "bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20"
                                    : "text-gray-400 hover:text-white hover:bg-cyber-card"
                                    }`}>
                                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-cyber-accent" : "group-hover:text-white"}`} />
                                    <span className="font-medium">{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-client-pill"
                                            className="ml-auto w-1.5 h-1.5 bg-cyber-accent rounded-full shadow-[0_0_10px_#38BDF8]"
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-cyber-border space-y-2">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-cyber-card transition-colors cursor-pointer group"
                    >
                        <LogOut className="w-5 h-5 group-hover:text-cyber-red transition-colors" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                        <p className="text-gray-400 text-sm">
                            Welcome back, <span className="text-cyber-accent">{session?.user?.name || "User"}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-6 text-sm text-gray-400 mr-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                                <span>System Operational</span>
                            </div>
                            <span>Last Scan: 10m ago</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple p-[1px]">
                            <div className="w-full h-full rounded-full bg-cyber-card flex items-center justify-center font-bold text-white text-sm">
                                {userInitials}
                            </div>
                        </div>
                    </div>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
