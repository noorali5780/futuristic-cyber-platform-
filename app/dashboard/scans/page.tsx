import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AlertTriangle, CheckCircle2, Clock, Globe, Shield } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ScansPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect('/login');
    }

    // Fetch user's websites first
    const userSites = await prisma.website.findMany({
        where: { userId: session.user.id },
        select: { id: true }
    });

    const userSiteIds = userSites.map((s: any) => s.id);

    // Fetch scans for these sites
    const scans = await prisma.scanResult.findMany({
        where: { websiteId: { in: userSiteIds } },
        orderBy: { timestamp: 'desc' },
        take: 50,
        include: {
            website: true
        }
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-cyber-accent" />
                Scan History
            </h1>

            <div className="glass rounded-xl border border-cyber-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-cyber-card text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="p-4">Time</th>
                                <th className="p-4">Website</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Latency</th>
                                <th className="p-4">Score</th>
                                <th className="p-4">Insights</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cyber-border text-sm">
                            {scans.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No scans performed yet. Add a website to start monitoring.
                                    </td>
                                </tr>
                            ) : (
                                scans.map((scan: any) => (
                                    <tr key={scan.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-gray-400 font-mono">
                                            {new Date(scan.timestamp).toLocaleString()}
                                        </td>
                                        <td className="p-4 font-bold text-white flex items-center gap-2">
                                            <Globe className="w-3 h-3 text-gray-500" />
                                            {scan.website.name}
                                        </td>
                                        <td className="p-4">
                                            <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold w-fit ${scan.status >= 200 && scan.status < 400
                                                ? "bg-green-500/10 text-green-400"
                                                : "bg-red-500/10 text-red-400"
                                                }`}>
                                                {scan.status >= 200 && scan.status < 400 ? (
                                                    <CheckCircle2 className="w-3 h-3" />
                                                ) : (
                                                    <AlertTriangle className="w-3 h-3" />
                                                )}
                                                {scan.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-300 font-mono">
                                            {scan.latency}ms
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${scan.securityScore >= 80 ? 'bg-green-500' :
                                                            scan.securityScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                        style={{ width: `${scan.securityScore}%` }}
                                                    />
                                                </div>
                                                <span className="font-bold text-xs">{scan.securityScore}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-500 text-xs max-w-[200px] truncate">
                                            {scan.vulnerabilities.length > 0
                                                ? <span className="text-red-400">{scan.vulnerabilities.length} Issues Found</span>
                                                : <span className="text-green-400">Secure</span>
                                            }
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
