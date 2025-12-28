import { prisma } from "@/lib/prisma";

type LogLevel = "info" | "warn" | "error";

export async function logSystemEvent(
    level: LogLevel,
    message: string,
    userId?: string,
    meta?: any
) {
    try {
        // Console log for immediate feedback in dev
        const prefix = `[SYSTEM-${level.toUpperCase()}]`;
        console.log(`${prefix} ${message}`, meta ? JSON.stringify(meta) : '');

        // Persist to DB
        await prisma.systemLog.create({
            data: {
                level,
                message,
                userId: userId || null,
                meta: meta || {},
            },
        });
    } catch (error) {
        // Fallback if DB logging fails
        console.error("Failed to persist system log:", error);
    }
}
