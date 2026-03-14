import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/context/session-provider";
import { GlobalLoader } from "@/components/general/GlobalLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "EduFlow - Modern Learning Management System",
    template: "%s | EduFlow LMS",
  },
  description:
    "Elevate your learning experience with EduFlow - A modern, interactive learning management system offering comprehensive courses, progress tracking, and community support.",
  keywords: [
    "online learning",
    "courses",
    "education",
    "LMS",
    "e-learning",
    "programming",
    "web development",
  ],
  authors: [{ name: "EduFlow Team" }],
  creator: "EduFlow",
  publisher: "EduFlow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EduFlow - Modern Learning Management System",
    description:
      "Elevate your learning experience with our modern, interactive learning platform.",
    url: "/",
    siteName: "EduFlow LMS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EduFlow - Modern Learning Management System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduFlow - Modern Learning Management System",
    description:
      "Elevate your learning experience with our modern, interactive learning platform.",
    images: ["/og-image.png"],
    creator: "@eduflow",
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
    icon: "/icon.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <GlobalLoader />
            {children}
            <Toaster closeButton position={"bottom-center"} />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
