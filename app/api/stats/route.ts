import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const isAdmin = session.user.role === 'admin';

        if (isAdmin) {
            // Admin View: Global Stats
            const [totalUsers, totalWebsites, activeWebsites, invalidSslSites] = await Promise.all([
                prisma.user.count(),
                prisma.website.count(),
                prisma.website.count({ where: { status: 'up' } }),
                prisma.website.count({ where: { sslValid: false } })
            ]);

            // Threats: down sites + invalid SSL sites (overlap possible but simple sum for now)
            const downSites = await prisma.website.count({ where: { status: 'down' } });
            const threatsDetected = downSites + invalidSslSites;

            return NextResponse.json({
                role: 'admin',
                stats: {
                    totalUsers,
                    totalWebsites,
                    activeWebsites,
                    threatsDetected
                }
            });
        } else {
            // User View: Personal Stats
            const mySites = await prisma.website.findMany({
                where: { userId: session.user.id }
            });

            const totalSites = mySites.length;
            const onlineSites = mySites.filter(w => w.status === 'up').length;

            // Calculate average latency
            const totalLatency = mySites.reduce((acc, site) => acc + (site.latency || 0), 0);
            const avgLatency = totalSites > 0 ? Math.round(totalLatency / totalSites) : 0;

            const threats = mySites.filter(w => !w.sslValid || w.status === 'down').length;

            return NextResponse.json({
                role: 'user',
                stats: {
                    totalSites,
                    onlineSites,
                    avgLatency,
                    threats
                }
            });
        }
    } catch (error) {
        console.error("Stats API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
