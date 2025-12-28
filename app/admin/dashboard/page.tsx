import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./dashboard-client";

export const dynamic = 'force-dynamic';

async function getAdminStats() {
    const [totalUsers, totalWebsites, activeWebsites, threatsDetected, recentUsers, logs] = await Promise.all([
        prisma.user.count(),
        prisma.website.count(),
        prisma.website.count({ where: { status: 'up' } }),
        prisma.scanResult.count({ where: { vulnerabilities: { isEmpty: false } } }),
        prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, name: true, email: true, role: true, createdAt: true }
        }),
        prisma.systemLog.findMany({
            take: 10,
            orderBy: { timestamp: 'desc' }
        })
    ]);

    return {
        stats: {
            totalUsers,
            totalWebsites,
            activeWebsites,
            threatsDetected
        },
        recentUsers,
        logs
    };
}

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
        redirect('/admin/login');
    }

    const data = await getAdminStats();

    return <AdminDashboardClient {...data} />;
}
