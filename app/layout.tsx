import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gradeup.solutions"),
  title: {
    default: "Grade Up Solutions — Modern Engineering for Startups",
    template: "%s — Grade Up Solutions",
  },
  description:
    "Modern engineering, calm execution, and premium delivery — for startups and digital teams. Product engineering, web apps, mobile, backend, DevOps, and AI.",
  keywords: [
    "product engineering",
    "web development",
    "mobile apps",
    "backend development",
    "DevOps",
    "AI automation",
    "startup engineering",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Grade Up Solutions" }],
  creator: "Grade Up Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Grade Up Solutions",
    title: "Grade Up Solutions — Modern Engineering for Startups",
    description:
      "Modern engineering, calm execution, and premium delivery — for startups and digital teams.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Grade Up Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grade Up Solutions — Modern Engineering for Startups",
    description:
      "Modern engineering, calm execution, and premium delivery — for startups and digital teams.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
