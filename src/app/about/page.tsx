import { AboutHeader } from "@/app/about/_components/about-header";
import { AboutContent } from "@/app/about/_components/about-content";
import { siteConfig } from "@/config/site.config";
import type { Metadata } from "next";
import AboutExperience from "./_components/about-experience";

export const metadata: Metadata = {
  title: `About | ${siteConfig.siteName}`,
  description: siteConfig.about,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto mt-16 max-w-4xl px-6 md:mt-24">
        <AboutHeader />
        <AboutContent />
        <AboutExperience />
      </div>
    </div>
  );
}
