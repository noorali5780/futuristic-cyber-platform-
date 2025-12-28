import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Settings, Server, Database, Mail, ShieldCheck } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect('/admin/login');
    }

    const systemStatus = [
        {
            name: "Database Connection",
            status: "Connected", // Prisma is working if we are here
            icon: Database,
            color: "text-green-400",
            bg: "bg-green-500/10"
        },
        {
            name: "SMTP Email Service",
            status: process.env.SMTP_HOST ? "Configured" : "Not Configured",
            detail: process.env.SMTP_HOST ? `Active (${process.env.SMTP_HOST})` : "Emails will not be sent",
            icon: Mail,
            color: process.env.SMTP_HOST ? "text-green-400" : "text-yellow-400",
            bg: process.env.SMTP_HOST ? "bg-green-500/10" : "bg-yellow-500/10"
        },
        {
            name: "Environment",
            status: process.env.NODE_ENV,
            icon: Server,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            name: "Security Protocol",
            status: "Standard",
            icon: ShieldCheck,
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
                <Settings className="w-8 h-8 text-gray-400" />
                System Configuration
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {systemStatus.map((item, i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg ${item.bg}`}>
                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                </div>
                                <h3 className="font-bold text-white">{item.name}</h3>
                            </div>
                            <p className="text-gray-400 text-sm">{item.detail || item.status}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${item.status === 'Connected' || item.status === 'Configured' || item.status === 'production' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                'bg-zinc-800 text-zinc-400 border-zinc-700'
                            }`}>
                            {item.status.toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl mt-6">
                <h3 className="text-lg font-bold text-white mb-2">Application Info</h3>
                <div className="grid grid-cols-2 max-w-sm gap-4 text-sm">
                    <span className="text-gray-500">Version</span>
                    <span className="text-white font-mono">0.1.0-beta</span>
                    <span className="text-gray-500">Build ID</span>
                    <span className="text-white font-mono">dev-build</span>
                </div>
            </div>
        </div>
    );
}
