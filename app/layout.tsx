import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    title: "Futuristic Kenya | Military-Grade Cybersecurity",
    description: "Production-grade cybersecurity engineered in Africa. AI Security, Zero-Trust Architecture, Active Directory hardening, and Threat Intelligence operations.",
    keywords: ["cybersecurity", "AI security", "Zero Trust", "pentesting", "Active Directory", "SOC", "threat intelligence", "Africa", "Kenya"],
    authors: [{ name: "Sadiki A. Noor" }, { name: "Manilla Inc" }],
    openGraph: {
        title: "Futuristic Kenya | Military-Grade Cybersecurity",
        description: "Production-grade cybersecurity engineered in Africa",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
