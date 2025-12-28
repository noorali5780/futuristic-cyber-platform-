import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                isAdmin: { label: "Admin Login", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required");
                }

                const { password, isAdmin } = credentials;
                const email = credentials.email.toLowerCase().trim();

                // Admin login check - Keep Env check for "Super Admin"
                if (isAdmin === "true") {
                    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
                    const adminPassword = process.env.ADMIN_PASSWORD;

                    if (email === adminEmail && password === adminPassword) {
                        return {
                            id: "admin-1",
                            email: adminEmail,
                            name: "Administrator",
                            role: "admin",
                            createdAt: new Date().toISOString() // Fallback for admin
                        };
                    }
                    throw new Error("Invalid admin credentials");
                }

                // Regular user login - DB check
                const user = await prisma.user.findUnique({
                    where: { email }
                });

                if (!user) {
                    throw new Error("User not found. Please sign up.");
                }

                const isValid = await bcrypt.compare(password, user.password);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role as "user" | "admin",
                    createdAt: user.createdAt.toISOString()
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // Server side session invalidation duration
    },

    // Session Cookie Configuration (Ephemeral - Clears on Browser Close)
    cookies: {
        sessionToken: {
            name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                // maxAge is intentionally undefined to make it a Session Cookie
            }
        }
    },

    pages: {
        signIn: "/login",
        error: "/login",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
                token.createdAt = (user as any).createdAt;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
                (session.user as any).createdAt = token.createdAt;
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

// Type augmentation for next-auth
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            role: "user" | "admin";
            createdAt: string;
        };
    }

    interface User {
        role: "user" | "admin";
        createdAt: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: "user" | "admin";
        id: string;
        createdAt: string;
    }
}
