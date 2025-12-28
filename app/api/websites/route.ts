import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { performScan, runScanAndSave } from "@/lib/monitoring";

import { z } from "zod";

const addWebsiteSchema = z.object({
    url: z.string().min(1, "URL is required").transform((val) => {
        let clean = val.trim();
        if (!clean.startsWith('http')) {
            clean = `https://${clean}`;
        }
        return clean;
    }).pipe(z.string().url("Invalid URL format")),
    name: z.string().min(2, "Company Name must be at least 2 characters"),
    ip: z.string().optional()
});

// Add a new website
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Zod Validation
        const result = addWebsiteSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({
                error: "Validation failed",
                details: result.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { url, name, ip } = result.data;

        // Create new website entry in DB
        const newWebsite = await prisma.website.create({
            data: {
                userId: session.user.id,
                url: url,
                name: name,
                ip: ip || 'Pending Resolution',
                status: "pending",
                latency: 0,
                sslValid: false,
            }
        });

        // Trigger an immediate initial scan in the background
        runScanAndSave(newWebsite.id).catch(err => {
            console.error("Initial scan failed for", newWebsite.id, err);
        });

        return NextResponse.json({ message: "Website added successfully", website: newWebsite }, { status: 201 });

    } catch (error) {
        console.error("Add Website Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Get user's websites
export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const userSites = await prisma.website.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(userSites);
    } catch (error) {
        console.error("Get Websites Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
