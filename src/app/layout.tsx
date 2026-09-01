import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Apzxrtra LMS — Institute of Management & Technology",
  description:
    "Apzxrtra Institute of Management & Technology — A premier education institute in Perinthalmanna, Kerala. 95% placement rate. Skill-based technical and management programs.",
  keywords: "Apzxrtra, LMS, Management, Technology, Perinthalmanna, Kerala, Smartphone Repair, HR Management",
  authors: [{ name: "Apzxrtra Institute" }],
  openGraph: {
    title: "Apzxrtra LMS",
    description: "Premium Learning Management System for Apzxrtra Institute",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
