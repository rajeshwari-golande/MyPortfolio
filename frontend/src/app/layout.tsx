import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rajeshwari Golande | Python Backend & AI/ML Engineer",
  description:
    "Portfolio of Rajeshwari Golande — Python Backend Engineer with AI/ML and DevOps expertise. Building scalable systems with FastAPI, PostgreSQL, Docker, and AWS.",
  keywords: [
    "Rajeshwari Golande",
    "Python Backend Engineer",
    "AI/ML Engineer",
    "FastAPI",
    "DevOps",
    "Software Engineer",
    "Portfolio",
  ],
  openGraph: {
    title: "Rajeshwari Golande | Backend & AI/ML Engineer",
    description:
      "Building scalable backend systems, AI-powered applications, and cloud-native solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <div className="fixed top-4 right-4 z-[60]">
            <ThemeToggle />
          </div>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AIAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
