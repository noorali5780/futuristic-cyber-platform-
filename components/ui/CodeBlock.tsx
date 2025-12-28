"use client";

import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
}

export default function CodeBlock({ code, language = "typescript", title }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            className="glass rounded-lg overflow-hidden border border-cyber-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {title && (
                <div className="bg-cyber-card px-4 py-2 border-b border-cyber-border flex items-center justify-between">
                    <span className="text-sm font-mono text-cyber-accent">{title}</span>
                    <button
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-cyber-accent transition-colors"
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            )}
            <div className="relative">
                {!title && (
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 z-10 p-2 glass rounded hover:bg-cyber-accent/20 transition-colors"
                        aria-label="Copy code"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-cyber-green" />
                        ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                        )}
                    </button>
                )}
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        background: "rgba(15, 15, 26, 0.5)",
                        fontSize: "0.875rem",
                    }}
                    showLineNumbers
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </motion.div>
    );
}
