import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ScrollText, AlertTriangle, Info, ShieldAlert } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function LogsPage() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect('/admin/login');
    }

    const logs = await prisma.systemLog.findMany({
        orderBy: { timestamp: 'desc' },
        take: 100
    });

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <ScrollText className="w-8 h-8 text-blue-500" />
                System Logs
            </h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
                        <tr>
                            <th className="p-4 border-b border-zinc-700">Timestamp</th>
                            <th className="p-4 border-b border-zinc-700">Level</th>
                            <th className="p-4 border-b border-zinc-700">Message</th>
                            <th className="p-4 border-b border-zinc-700">Meta</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-zinc-500">
                                    No logs found.
                                </td>
                            </tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log.id} className="hover:bg-zinc-800/50 transition-colors">
                                    <td className="p-4 text-zinc-400 font-mono text-sm">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${log.level === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                log.level === 'warn' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                            {log.level === 'error' && <ShieldAlert className="w-3 h-3" />}
                                            {log.level === 'warn' && <AlertTriangle className="w-3 h-3" />}
                                            {log.level === 'info' && <Info className="w-3 h-3" />}
                                            {log.level.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4 text-zinc-200">{log.message}</td>
                                    <td className="p-4 text-zinc-500 text-xs font-mono max-w-xs truncate">
                                        {log.meta ? JSON.stringify(log.meta) : '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
