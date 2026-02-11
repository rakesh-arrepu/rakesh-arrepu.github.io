import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rakesh Arrepu | Principal QA Engineer",
  description:
    "Portfolio of Rakesh Arrepu — Principal QA Engineer specializing in scalable automation frameworks, AI-assisted QA systems, and enterprise-grade quality strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        <Sidebar />
        {/* Main content offset dynamically by sidebar width via CSS var */}
        <main
          className="transition-all duration-300 ease-in-out"
          style={{ marginLeft: "var(--sidebar-w, 240px)" }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
