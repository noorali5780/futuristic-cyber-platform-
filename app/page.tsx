"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import AISecuritySection from "@/components/sections/AISecuritySection";
import WebSecuritySection from "@/components/sections/WebSecuritySection";
import ADSecuritySection from "@/components/sections/ADSecuritySection";
import ThreatIntelSection from "@/components/sections/ThreatIntelSection";
import ZeroTrustSection from "@/components/sections/ZeroTrustSection";
import AdditionalFeaturesSection from "@/components/sections/AdditionalFeaturesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";

export default function Home() {
    return (
        <main className="relative overflow-x-hidden">
            <Header />
            <Hero />

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-4 my-16">
                <div className="h-px bg-gradient-to-r from-transparent via-cyber-accent to-transparent" />
            </div>

            <AISecuritySection />

            <div className="max-w-7xl mx-auto px-4 my-16">
                <div className="h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent" />
            </div>

            <WebSecuritySection />

            <div className="max-w-7xl mx-auto px-4 my-16">
                <div className="h-px bg-gradient-to-r from-transparent via-cyber-purple to-transparent" />
            </div>

            <ADSecuritySection />

            <div className="max-w-7xl mx-auto px-4 my-16">
                <div className="h-px bg-gradient-to-r from-transparent via-cyber-accent to-transparent" />
            </div>

            <ThreatIntelSection />

            <div className="max-w-7xl mx-auto px-4 my-16">
                <div className="h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent" />
            </div>

            <ZeroTrustSection />

            <div className="max-w-7xl mx-auto px-4 my-16">
                <div className="h-px bg-gradient-to-r from-transparent via-cyber-purple to-transparent" />
            </div>

            <AdditionalFeaturesSection />

            <Footer />
        </main>
    );
}
