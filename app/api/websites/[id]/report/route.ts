import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSecurityReport } from "@/lib/report-generator";

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
        // Fetch website and verify ownership
        const website = await prisma.website.findUnique({
            where: { id: websiteId },
        });

        if (!website) {
            return NextResponse.json({ error: "Website not found" }, { status: 404 });
        }

        if (website.userId !== session.user.id && session.user.role !== 'admin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Fetch recent scans for history
        const scans = await prisma.scanResult.findMany({
            where: { websiteId: websiteId },
            orderBy: { timestamp: 'desc' },
            take: 20
        });

        // Generate PDF
        const pdfBuffer = await generateSecurityReport({ website, scans });

        // Create response with PDF headers
        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        headers.set("Content-Disposition", `attachment; filename="Security_Report_${website.name.replace(/\s+/g, '_')}.pdf"`);

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers,
        });

    } catch (error) {
        console.error("Report Generation Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
