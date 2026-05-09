import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Thakker - AI Maker Portfolio | 6-Week Journey Building AI Products",
  description: "Explore Yash Thakker's AI Maker journey: 6 weeks of intensive learning covering HTML projects, full-stack AI apps, Python automation, AI agents, Chrome extensions, and deployment. 250K+ students taught, 12+ years building AI products.",
  keywords: ["Yash Thakker", "AI Maker", "AI Portfolio", "ChatGPT", "Claude AI", "AI Education", "Full Stack Developer", "AI Instructor", "Generative AI", "AI Projects"],
  authors: [{ name: "Yash Thakker" }],
  openGraph: {
    title: "Yash Thakker - AI Maker Portfolio",
    description: "6-week AI Maker journey showcasing HTML projects, AI apps, Python automation, agents, extensions & deployment",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
