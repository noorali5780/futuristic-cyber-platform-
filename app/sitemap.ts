import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://futuristic.loggin.pro';

    // Static public routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/careers',
        '/partners',
        '/research',
        '/documentation',
        '/blog',
        '/case-studies',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic blog routes
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
}
