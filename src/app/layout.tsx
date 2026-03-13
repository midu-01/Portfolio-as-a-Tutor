import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { getSiteData } from "@/lib/data";
import { absoluteUrl } from "@/lib/utils";

import "./globals.css";

const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display"
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getSiteData();

  const title = siteSettings?.seoTitle ?? "Midu Mojumder | Tutor Portfolio";
  const description =
    siteSettings?.seoDescription ??
    "Private tutor for SSC, HSC, and admission-level science students.";

  return {
    metadataBase: new URL(absoluteUrl("/")),
    title,
    description,
    applicationName: "Midu Mojumder Tutor Portfolio",
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteUrl("/"),
      siteName: siteSettings?.siteName ?? "Midu Mojumder",
      images: siteSettings?.ogImageUrl ? [{ url: siteSettings.ogImageUrl }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: siteSettings?.ogImageUrl ? [siteSettings.ogImageUrl] : undefined
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable}`}
        suppressHydrationWarning
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
