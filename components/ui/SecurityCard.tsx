"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SecurityCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    className?: string;
}

export default function SecurityCard({
    icon,
    title,
    description,
    className,
}: SecurityCardProps) {
    return (
        <motion.div
            className={cn(
                "glass rounded-xl p-6 hover:border-cyber-accent/50 transition-all duration-300 group",
                className
            )}
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <motion.div
                className="text-cyber-accent mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
            >
                {icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-cyber-accent transition-colors">
                {title}
            </h3>
            <p className="text-gray-400">{description}</p>
        </motion.div>
    );
}
