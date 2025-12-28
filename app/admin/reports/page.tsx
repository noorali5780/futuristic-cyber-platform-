import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FileText, Download, ExternalLink } from "lucide-react";
import AuditButton from "./AuditButton";

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect('/admin/login');
    }

    const websites = await prisma.website.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: true,
            scans: {
                take: 1,
                orderBy: { timestamp: 'desc' }
            }
        }
    });

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
                <FileText className="w-8 h-8 text-cyan-500" />
                Security Reports
            </h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
                        <tr>
                            <th className="p-4 border-b border-zinc-700">Website</th>
                            <th className="p-4 border-b border-zinc-700">Owner</th>
                            <th className="p-4 border-b border-zinc-700">Last Scan</th>
                            <th className="p-4 border-b border-zinc-700">Score</th>
                            <th className="p-4 border-b border-zinc-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {websites.map((site: any) => {
                            const latestScan = site.scans[0];
                            const score = latestScan ? latestScan.securityScore : 0;

                            return (
                                <tr key={site.id} className="hover:bg-zinc-800/50 transition-colors">
                                    <td className="p-4">
                                        <div>
                                            <p className="font-bold text-white">{site.name}</p>
                                            <a href={site.url} target="_blank" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                                                {site.url} <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </td>
                                    <td className="p-4 text-zinc-400 text-sm">
                                        {site.user.email}
                                    </td>
                                    <td className="p-4 text-zinc-500 font-mono text-xs">
                                        {site.lastScanAt ? new Date(site.lastScanAt).toLocaleString() : 'Never'}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-12 h-1.5 rounded-full ${score >= 80 ? 'bg-green-500/20' :
                                                score >= 50 ? 'bg-yellow-500/20' : 'bg-red-500/20'
                                                }`}>
                                                <div
                                                    className={`h-full rounded-full ${score >= 80 ? 'bg-green-500' :
                                                        score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${score}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono font-bold text-zinc-300">{score}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <a
                                            href={`/api/websites/${site.id}/report`}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all text-xs font-bold border border-cyan-500/20"
                                        >
                                            <Download className="w-3 h-3" />
                                            Download
                                        </a>
                                        <AuditButton websiteId={site.id} />
                                    </td>
                                </tr>
                            );
                        })}
                        {websites.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-zinc-500">No websites available for reporting.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
