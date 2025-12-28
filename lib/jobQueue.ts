/**
 * Simple Background Job Queue
 * Uses setTimeout for non-blocking execution on the server
 * In production, replace with Redis-based queue (BullMQ) or similar
 */

type JobFunction = () => Promise<void>;

interface Job {
    id: string;
    status: 'pending' | 'running' | 'complete' | 'failed';
    startedAt?: Date;
    completedAt?: Date;
    error?: string;
}

const jobs = new Map<string, Job>();

/**
 * Queue a job for background execution
 * Returns immediately with job ID
 */
export function queueJob(jobId: string, fn: JobFunction): string {
    jobs.set(jobId, { id: jobId, status: 'pending' });

    // Execute in background using setImmediate (non-blocking)
    setImmediate(async () => {
        const job = jobs.get(jobId);
        if (!job) return;

        job.status = 'running';
        job.startedAt = new Date();

        try {
            await fn();
            job.status = 'complete';
            job.completedAt = new Date();
            console.log(`[JobQueue] Job ${jobId} completed`);
        } catch (error) {
            job.status = 'failed';
            job.error = String(error);
            console.error(`[JobQueue] Job ${jobId} failed:`, error);
        }
    });

    return jobId;
}

/**
 * Get job status
 */
export function getJobStatus(jobId: string): Job | null {
    return jobs.get(jobId) || null;
}

/**
 * Clean up old jobs (call periodically)
 */
export function cleanupJobs(maxAgeMs: number = 3600000): void {
    const now = Date.now();
    Array.from(jobs.entries()).forEach(([id, job]) => {
        if (job.completedAt && now - job.completedAt.getTime() > maxAgeMs) {
            jobs.delete(id);
        }
    });
}
