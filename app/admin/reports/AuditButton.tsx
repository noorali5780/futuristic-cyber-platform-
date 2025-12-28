"use client";

import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function AuditButton({ websiteId }: { websiteId: string }) {
    const [loading, setLoading] = useState(false);

    const handleAudit = async () => {
        if (!confirm("Start a Deep Security Audit? This will scan all subdomains and may take several minutes. You'll be notified when complete.")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/scan/${websiteId}`, { method: "POST" });
            const data = await res.json();

            if (res.status === 202 || res.ok) {
                alert(`✅ Deep scan started!\n\nJob ID: ${data.jobId || 'N/A'}\n\nThe scan is running in the background. You'll receive an email when complete. Refresh this page in a few minutes to see results.`);
                // Don't reload - scan is running in background
            } else {
                alert(`❌ Audit failed: ${data.error}`);
            }
        } catch (error) {
            alert("Network error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleAudit}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-all text-xs font-bold border border-purple-500/20 disabled:opacity-50 ml-2"
        >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShieldCheck className="w-3 h-3" />}
            Audit
        </button>
    );
}
