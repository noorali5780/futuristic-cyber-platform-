"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts, categories } from "@/lib/blog-data";
import { Search, BookOpen, TrendingUp } from "lucide-react";

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory =
            selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );
        return matchesCategory && matchesSearch;
    });

    const featuredPosts = blogPosts.filter((post) => post.featured);

    return (
        <main className="relative overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <BookOpen className="w-8 h-8 text-cyber-accent" />
                        <h1 className="text-5xl md:text-7xl font-bold">
                            <span className="text-gradient">Security</span> Blog
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
                    >
                        Insights, research, and best practices from our cybersecurity experts
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-2xl mx-auto relative"
                    >
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 glass rounded-lg border border-cyber-border focus:border-cyber-accent focus:outline-none text-white placeholder-gray-500"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Category Filter */}
            <section className="pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === category
                                    ? "bg-gradient-cyber text-black"
                                    : "glass border border-cyber-border hover:border-cyber-accent"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* Featured Posts */}
            {selectedCategory === "All" && !searchQuery && (
                <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <TrendingUp className="w-6 h-6 text-cyber-green" />
                        <h2 className="text-3xl font-bold">Featured Articles</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>
                </section>
            )}

            {/* All Posts */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-8"
                >
                    {selectedCategory === "All" ? "All Articles" : selectedCategory}
                    <span className="text-gray-500 text-xl ml-3">
                        ({filteredPosts.length})
                    </span>
                </motion.h2>

                <AnimatePresence mode="wait">
                    {filteredPosts.length > 0 ? (
                        <motion.div
                            key={selectedCategory + searchQuery}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredPosts.map((post, index) => (
                                <BlogCard key={post.id} post={post} index={index} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <p className="text-xl text-gray-400">
                                No articles found matching your criteria.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-2xl p-12 text-center border-2 border-cyber-accent/30"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        Stay Updated on{" "}
                        <span className="text-gradient">Cybersecurity Trends</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Subscribe to our newsletter for the latest security insights and
                        updates
                    </p>
                    <motion.button
                        className="px-8 py-4 bg-gradient-cyber rounded-lg font-bold text-lg text-black"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Subscribe Now
                    </motion.button>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
