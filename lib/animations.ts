import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
};

export const slideInLeft: Variants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const floatAnimation = {
    y: [0, -20, 0],
    transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

export const pulseGlow = {
    boxShadow: [
        "0 0 20px rgba(0, 255, 255, 0.5)",
        "0 0 40px rgba(0, 255, 255, 0.8)",
        "0 0 20px rgba(0, 255, 255, 0.5)",
    ],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
    },
};
