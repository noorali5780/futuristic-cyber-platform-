import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        // Normalize email to lowercase for consistent comparison
        const normalizedEmail = email.toLowerCase().trim();

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate name
        const trimmedName = name.trim();
        if (trimmedName.length < 2) {
            return NextResponse.json(
                { error: "Name must be at least 2 characters" },
                { status: 400 }
            );
        }

        // Validate password strength
        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        // Check if email is already registered
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "An account with this email already exists. Please login instead." },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user in DB
        const newUser = await prisma.user.create({
            data: {
                name: trimmedName,
                email: normalizedEmail,
                password: hashedPassword,
                role: "user"
            }
        });

        console.log(`[AUTH] User registered: ${normalizedEmail}`);

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: { id: newUser.id, email: newUser.email, name: newUser.name }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
