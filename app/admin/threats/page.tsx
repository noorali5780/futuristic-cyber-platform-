import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShieldAlert, Globe, AlertTriangle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ThreatsPage() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect('/admin/login');
    }

    // Fetch scans that have vulnerabilities (array length > 0)
    // Note: Prisma array filtering can be tricky.
    // 'isEmpty' is available on some versions.
    // Fallback: fetch all recent and filter or use NOT equals [].
    const threats = await prisma.scanResult.findMany({
        where: {
            NOT: {
                vulnerabilities: {
                    equals: []
                }
            }
        },
        orderBy: { timestamp: 'desc' },
        take: 50,
        include: {
            website: true
        }
    });

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
                <ShieldAlert className="w-8 h-8 text-red-500" />
                Active Threats
            </h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 bg-red-500/10 border-b border-red-500/20 text-red-200 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Displaying latest {threats.length} security events requiring attention.
                </div>

                <div className="divide-y divide-zinc-800">
                    {threats.map((threat) => (
                        <div key={threat.id} className="p-4 hover:bg-zinc-800/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-zinc-500" />
                                    <span className="font-bold text-white">{threat.website.name}</span>
                                    <a href={threat.website.url} target="_blank" className="text-xs text-blue-400 hover:underline">
                                        {threat.website.url}
                                    </a>
                                </div>
                                <span className="text-zinc-500 font-mono text-xs">
                                    {new Date(threat.timestamp).toLocaleString()}
                                </span>
                            </div>

                            <div className="mt-2 space-y-1">
                                {threat.vulnerabilities.map((vuln, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-red-300 bg-red-500/5 px-2 py-1 rounded w-fit">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        {vuln}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 flex items-center gap-4 text-xs font-mono text-zinc-500">
                                <span>Score: <span className="text-white">{threat.securityScore}/100</span></span>
                                <span>Status: {threat.status}</span>
                                <span>SSL: {(threat.ssl as any)?.valid ? 'Valid' : 'Invalid'}</span>
                            </div>
                        </div>
                    ))}
                    {threats.length === 0 && (
                        <div className="p-12 text-center text-zinc-500">
                            <ShieldAlert className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No active threats detected across the platform.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
