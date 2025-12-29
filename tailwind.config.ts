import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",      
    ],
    theme: {
        extend: {
            colors: {
                bg: "var(--color-bg)",
                surface: "var(--color-surface)",
                "surface-soft": "var(--color-surface-soft)",

                text: {
                    primary: "var(--color-text-primary)",
                    secondary: "var(--color-text-secondary)",
                    muted: "var(--color-text-muted)",
                },

                border: {
                    subtle: "var(--color-border-subtle)",
                    soft: "var(--color-border-soft)",
                },

                accent: {
                    DEFAULT: "var(--color-accent)",
                    soft: "var(--color-accent-soft)",
                },
            },
            // Colors are now defined in @theme directive in globals.css
            boxShadow: {
                card: "0 10px 30px rgba(0,0,0,0.04)",
                "card-hover": "0 20px 50px rgba(0,0,0,0.08)",
                subtle: "0 10px 30px rgba(0,0,0,0.04)",
                hover: "0 20px 50px rgba(0,0,0,0.08)",
                premium: "0 30px 70px rgba(0,0,0,0.10)",
                soft: "0 4px 16px rgba(0,0,0,0.04)",
                glow: "0 0 0 1px rgba(47,107,255,0.18), 0 20px 40px rgba(47,107,255,0.18)",
            },
        },
    },
} satisfies Config;
