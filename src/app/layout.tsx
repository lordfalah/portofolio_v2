import type { Metadata, Viewport } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { buildMetadata } from "@/config/site.config";
import { FooterSection } from "@/components/layout/footer";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import { fontHeading } from "@/lib/fonts";

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background text-foreground min-h-screen antialiased",
          GeistSans.variable,
          GeistMono.variable,
          fontHeading.variable,
        )}
      >
        <NextTopLoader />
        <ThemeProvider>
          <Navbar />
          <main>
            <NuqsAdapter>{children}</NuqsAdapter>
          </main>
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}
