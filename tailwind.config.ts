import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    bg: "#020617", // Slate 950
                    card: "#0f172a", // Slate 900
                    border: "#1e293b", // Slate 800
                    accent: "#38BDF8", // Sky 400
                    green: "#34D399", // Emerald 400
                    purple: "#A855F7", // Purple 500
                    red: "#F472B6", // Pink 400 (softer red)
                    blue: "#60A5FA", // Blue 400
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-cyber": "linear-gradient(135deg, #38BDF8 0%, #A855F7 100%)",
                "gradient-matrix": "linear-gradient(135deg, #34D399 0%, #38BDF8 100%)",
                "gradient-danger": "linear-gradient(135deg, #F472B6 0%, #FB7185 100%)",
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-down": "slideDown 0.5s ease-out",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 5px #00ffff, 0 0 10px #00ffff" },
                    "100%": { boxShadow: "0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff" },
                },
                slideUp: {
                    "0%": { transform: "translateY(100px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-100px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};
export default config;
