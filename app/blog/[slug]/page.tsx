"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog-data";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = blogPosts.find((p) => p.id === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="relative overflow-x-hidden">
            <Header />

            <article className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-cyber-accent hover:text-cyber-green transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </motion.div>

                {/* Category Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/30">
                        {post.category}
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                >
                    {post.title}
                </motion.h1>

                {/* Meta Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center gap-6 mb-8 text-gray-400"
                >
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                timeZone: "UTC",
                            })}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>{post.readTime}</span>
                    </div>
                </motion.div>

                {/* Author */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-lg p-6 mb-12 flex items-center gap-4"
                >
                    <div className="w-16 h-16 rounded-full bg-gradient-cyber flex items-center justify-center flex-shrink-0">
                        <User className="w-8 h-8 text-black" />
                    </div>
                    <div>
                        <div className="font-bold text-lg">{post.author.name}</div>
                        <div className="text-gray-400">{post.author.role}</div>
                    </div>
                </motion.div>

                {/* Excerpt */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass rounded-lg p-6 mb-12 border-l-4 border-cyber-accent"
                >
                    <p className="text-xl text-gray-300 italic">{post.excerpt}</p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="prose prose-invert prose-lg max-w-none mb-12"
                >
                    <div
                        className="text-gray-300 leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.replace(/\n/g, "<br/>")) }}
                    />
                </motion.div>

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="glass rounded-lg p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Tag className="w-5 h-5 text-cyber-accent" />
                        <h3 className="text-lg font-semibold">Tags</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 bg-cyber-card rounded-full text-sm font-medium hover:bg-cyber-accent/20 transition-colors cursor-pointer"
                            >
                                #{tag.replace(/\s+/g, "")}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 pt-8 border-t border-cyber-border flex justify-between items-center"
                >
                    <Link
                        href="/blog"
                        className="px-6 py-3 glass rounded-lg font-semibold hover:border-cyber-accent transition-all flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        More Articles
                    </Link>

                    <Link
                        href="/#contact"
                        className="px-6 py-3 bg-gradient-cyber rounded-lg font-semibold text-black hover:shadow-2xl transition-shadow"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </article>

            <Footer />
        </main>
    );
}
