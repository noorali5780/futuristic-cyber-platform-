"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl overflow-hidden hover:border-cyber-accent/50 transition-all group h-full flex flex-col"
        >
            {/* Category Badge */}
            <div className="p-6 pb-4">
                <motion.span
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/30"
                    whileHover={{ scale: 1.05 }}
                >
                    {post.category}
                </motion.span>
            </div>

            {/* Content */}
            <div className="px-6 flex-grow flex flex-col">
                <Link href={`/blog/${post.id}`}>
                    <motion.h3
                        className="text-xl md:text-2xl font-bold mb-3 group-hover:text-cyber-accent transition-colors cursor-pointer line-clamp-2"
                        whileHover={{ x: 5 }}
                    >
                        {post.title}
                    </motion.h3>
                </Link>

                <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-cyber-card rounded text-gray-400"
                        >
                            #{tag.replace(/\s+/g, "")}
                        </span>
                    ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-cyber-border">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    timeZone: "UTC",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    <Link href={`/blog/${post.id}`}>
                        <motion.div
                            className="flex items-center gap-1 text-cyber-accent font-semibold cursor-pointer"
                            whileHover={{ x: 5 }}
                        >
                            Read More
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    </Link>
                </div>
            </div>

            {/* Author */}
            <div className="px-6 py-4 bg-cyber-card/50 border-t border-cyber-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-cyber flex items-center justify-center">
                    <User className="w-5 h-5 text-black" />
                </div>
                <div>
                    <div className="font-semibold text-sm">{post.author.name}</div>
                    <div className="text-xs text-gray-500">{post.author.role}</div>
                </div>
            </div>
        </motion.article>
    );
}
