import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { CustomCursor } from "@/components/common/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koustubha Pathy | Creative Developer & DevOps Enthusiast",
  description: "Portfolio of Koustubha Pathy - a creative developer building immersive web experiences with expertise in DevOps, modern web technologies, and scalable infrastructure.",
  keywords: ["Koustubha Pathy", "Portfolio", "Web Developer", "DevOps", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Koustubha Pathy" }],
  creator: "Koustubha Pathy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://koustubhapathy.dev",
    title: "Koustubha Pathy | Creative Developer",
    description: "Portfolio showcasing projects, experience, and skills in web development and DevOps.",
    siteName: "Koustubha Pathy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koustubha Pathy | Creative Developer",
    description: "Building secure, scalable infrastructure and optimizing development workflows.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <ScrollProgress />
            <CustomCursor />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-16">
                {children}
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
