import React from "react";
import { buildMetadata, siteConfig } from "@/config/site.config";
import ContactCard from "@/app/contact/_components/contact-card";

export const metadata = buildMetadata({
  title: `Contact | ${siteConfig.siteName}`,
  description: "Get in touch about landing pages, branding, or templates.",
});

export default function ContactPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 pt-20 pb-5 sm:px-6 lg:px-8">
      <ContactCard />
    </main>
  );
}
