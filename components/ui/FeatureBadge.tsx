"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureBadgeProps {
    text: string;
    className?: string;
}

export default function FeatureBadge({ text, className }: FeatureBadgeProps) {
    return (
        <motion.div
            className={cn(
                "glass px-4 py-2 rounded-full text-sm font-medium border-cyber-accent/30 hover:border-cyber-accent transition-all",
                className
            )}
            whileHover={{ scale: 1.05, borderColor: "rgba(0, 255, 255, 0.8)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {text}
        </motion.div>
    );
}
