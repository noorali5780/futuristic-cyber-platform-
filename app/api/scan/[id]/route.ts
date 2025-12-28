import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { queueJob, getJobStatus } from "@/lib/jobQueue";
import { performDeepScan } from "@/lib/deepScan";

/**
 * POST /api/scan/[id]
 * Triggers a deep security scan in the background
 * Returns 202 Accepted immediately with job ID
 */
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const websiteId = params.id;

    try {
        // Verify ownership
        const website = await prisma.website.findUnique({
            where: { id: websiteId },
        });

        if (!website) {
            return NextResponse.json({ error: "Website not found" }, { status: 404 });
        }

        if (website.userId !== session.user.id && session.user.role !== 'admin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Queue the deep scan in background (non-blocking)
        const jobId = `scan-${websiteId}-${Date.now()}`;
        queueJob(jobId, async () => {
            await performDeepScan(websiteId);
        });

        // Update website status to indicate scan in progress
        await prisma.website.update({
            where: { id: websiteId },
            data: { status: 'scanning' }
        });

        // Return immediately with 202 Accepted
        return NextResponse.json({
            message: "Deep security scan started",
            jobId,
            websiteId,
            status: "scanning",
            note: "Scan is running in background. Check the Reports page for results."
        }, { status: 202 });

    } catch (error) {
        console.error("Manual Scan Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

/**
 * GET /api/scan/[id]
 * Get the status of a scan job (optional polling endpoint)
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const websiteId = params.id;

    try {
        const website = await prisma.website.findUnique({
            where: { id: websiteId },
            select: { status: true, lastScanAt: true }
        });

        if (!website) {
            return NextResponse.json({ error: "Website not found" }, { status: 404 });
        }

        // Get latest scan result
        const latestScan = await prisma.scanResult.findFirst({
            where: { websiteId },
            orderBy: { timestamp: 'desc' }
        });

        return NextResponse.json({
            websiteId,
            status: website.status,
            lastScanAt: website.lastScanAt,
            latestScan: latestScan ? {
                score: latestScan.securityScore,
                timestamp: latestScan.timestamp,
                vulnerabilities: latestScan.vulnerabilities.length
            } : null
        });

    } catch (error) {
        console.error("Get Scan Status Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
