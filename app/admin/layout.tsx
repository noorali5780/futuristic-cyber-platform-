"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    ShieldAlert,
    Activity,
    Database
} from "lucide-react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session } = useSession();

    // Don't show layout on login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/admin/dashboard" },
        { icon: ShieldAlert, label: "Threats", href: "/admin/threats" },
        { icon: Users, label: "Users", href: "/admin/users" },
        { icon: Database, label: "Logs", href: "/admin/logs" },
        { icon: FileText, label: "Reports", href: "/admin/reports" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ];

    const handleSignOut = () => {
        signOut({ callbackUrl: "/admin/login" });
    };

    return (
        <div className="min-h-screen bg-cyber-bg flex">
            {/* Sidebar */}
            <aside className="w-64 glass-strong border-r border-cyber-border hidden md:flex flex-col fixed h-full z-20">
                <div className="p-6 flex items-center gap-3 border-b border-cyber-border">
                    <div className="w-8 h-8 rounded bg-gradient-cyber flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-wide">Admin<span className="text-cyber-accent">Panel</span></span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? "bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20"
                                    : "text-gray-400 hover:text-white hover:bg-cyber-card"
                                    }`}>
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="ml-auto w-1 h-1 bg-cyber-accent rounded-full"
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-cyber-border">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-cyber-red hover:bg-cyber-red/10 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Disconnect</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                        <p className="text-gray-400 text-sm">
                            Welcome back, <span className="text-cyber-accent">{session?.user?.name || "Administrator"}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20">
                            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                            <span className="text-xs text-cyber-green font-mono">SYSTEM SECURE</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-cyber-card border border-cyber-border flex items-center justify-center">
                            <span className="font-bold text-cyber-accent">AD</span>
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
