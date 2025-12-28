import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Simple in-memory rate limiter
const ratelimit = new Map<string, { count: number, startTime: number }>();

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl;

        // 1. Rate Limiting for API routes
        if (pathname.startsWith('/api')) {
            const ip = req.ip || '127.0.0.1';
            const limit = 100; // 100 requests (increased for dev usage comfort)
            const windowMs = 60 * 1000; // per minute

            const current = ratelimit.get(ip) || { count: 0, startTime: Date.now() };

            if (Date.now() - current.startTime > windowMs) {
                current.count = 1;
                current.startTime = Date.now();
            } else {
                current.count++;
            }

            ratelimit.set(ip, current);

            if (current.count > limit) {
                return new NextResponse(
                    JSON.stringify({ error: "Too many requests" }),
                    { status: 429, headers: { 'content-type': 'application/json' } }
                );
            }
        }

        // Admin routes protection
        if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
            if (!token || token.role !== "admin") {
                return NextResponse.redirect(new URL("/admin/login", req.url));
            }
        }

        // Dashboard routes protection (for regular users)
        if (pathname.startsWith("/dashboard")) {
            if (!token) {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }

        // Security Headers
        const response = NextResponse.next();
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

        return response;
    },
    {
        callbacks: {
            // Return true to authorized, false to redirect to signIn
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                // Allow access to login pages without token
                if (pathname === "/login" || pathname === "/signup" || pathname === "/admin/login") {
                    return true;
                }

                // Public APIs (if any) or NextAuth routes should be allowed
                // NextAuth routes usually start with /api/auth, we should allow them generally, 
                // but rate limit might still apply (good).
                if (pathname.startsWith("/api/auth")) {
                    return true;
                }

                // For protected routes, require token
                if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
                    return !!token;
                }

                // Allow all other routes (including generic APIs, let middleware function handle specific blocks/limits)
                return true;
            },
        },
    }
);

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/api/:path*",
    ],
};
