import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://futuristic.loggin.pro';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/dashboard/',
                '/api/',
                '/login',
                '/signup',
                '/_next/',
                '/static/',
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
