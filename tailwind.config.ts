import type { Config } from "tailwindcss";

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // Colors are now defined in @theme directive in globals.css
            boxShadow: {
                card: "0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
                "card-hover": "0 8px 24px rgba(0, 102, 255, 0.2), 0 4px 12px rgba(0, 102, 255, 0.15)",
                subtle: "0 10px 30px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)",
                hover: "0 20px 50px rgba(0, 102, 255, 0.25), 0 4px 16px rgba(0, 102, 255, 0.15)",
                premium: "0 30px 60px rgba(0, 102, 255, 0.3), 0 8px 24px rgba(0, 102, 255, 0.2)",
                soft: "0 4px 16px rgba(0, 0, 0, 0.2)",
                glow: "0 0 0 1px rgba(0, 102, 255, 0.2), 0 20px 40px rgba(0, 102, 255, 0.25)",
            },
        },
    },
} satisfies Config;
