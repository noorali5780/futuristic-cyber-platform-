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
        // Fetch recent scans for user's websites
        const userSites = await prisma.website.findMany({
            where: { userId: session.user.id },
            select: { id: true }
        });

        const userSiteIds = userSites.map(s => s.id);

        const recentScans = await prisma.scanResult.findMany({
            where: { websiteId: { in: userSiteIds } },
            orderBy: { timestamp: 'desc' },
            take: 20
        });

        // 1. Traffic (Latency) Analysis - Reverse for chart (oldest to newest)
        const recentTraffic = [...recentScans].reverse().map(scan => ({
            time: new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            latency: scan.latency,
            status: scan.status
        }));

        // 2. Threats Analysis (Fetch all relevant scans or just recent ones? 
        // For accurate "Detected" counts, we might want a larger window or aggregate differently.
        // For now, let's keep it consistent with the previous logic (based on filtered scans).
        // To be more robust, we might query all scans with low score.)

        const threats = await prisma.scanResult.findMany({
            where: {
                websiteId: { in: userSiteIds },
                securityScore: { lt: 80 }
            },
            take: 100 // Limit to last 100 bad scans for breakdown
        });

        const threatCount = threats.length; // This might be "scans with threats", not unique threats.

        // Group threats by type
        const threatTypes: Record<string, number> = {};
        threats.forEach(t => {
            // Prisma returns String[] as string[]
            const vulns = t.vulnerabilities as string[];
            vulns.forEach(v => {
                threatTypes[v] = (threatTypes[v] || 0) + 1;
            });
        });

        const threatBreakdown = Object.entries(threatTypes).map(([name, count]) => ({ name, count }));

        return NextResponse.json({
            traffic: recentTraffic,
            threats: {
                total: threatCount,
                breakdown: threatBreakdown
            },
            systemContext: {
                monitoredSites: userSiteIds.length
            }
        });

    } catch (error) {
        console.error("Analytics API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
