import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Announcement,
  AnnouncementTitle,
  AnnouncementTag,
} from "@/components/ui/announcement";
import { ArrowRight, Zap } from "lucide-react";
import { ArrowUpRightIcon } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="from-primary/5 to-secondary/5 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent select-none" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:4rem_4rem] select-none" />
      <div className="relative mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Announcement Component */}

          <Announcement
            themed
            className="border-border dark:border-secondary animate-fade-in mx-auto flex w-fit max-w-full items-center justify-center border px-4 py-1.5 text-xs sm:text-sm md:text-base"
          >
            <AnnouncementTag className="truncate">
              Latest update
            </AnnouncementTag>
            <AnnouncementTitle className="flex items-center gap-2">
              New Portfolio V2 🎉
              <ArrowUpRightIcon
                className="text-muted-foreground shrink-0"
                size={16}
              />
            </AnnouncementTitle>
          </Announcement>

          <div className="animate-glow animate-fade-left hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
          {/* Main Heading - show name and description from config */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="from-foreground to-muted-foreground text-edge-outline animate-title relative z-10 bg-gradient-to-b bg-clip-text text-center font-sans text-4xl leading-none font-extrabold tracking-tight text-transparent sm:text-6xl md:text-8xl lg:text-9xl xl:text-[8rem]">
              <span className="block">{siteConfig.siteName}</span>
            </h1>
            <p className="text-muted-foreground animate-fade-in mx-auto max-w-2xl px-4 text-sm leading-relaxed sm:max-w-3xl sm:px-0 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              I Build Next-Generation Technologies
            </p>
          </div>

          <div className="animate-glow animate-fade-right hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
          {/* CTA Buttons */}
          <div className="animate-fade-in flex flex-col items-center justify-center gap-3 pt-6 sm:flex-row sm:gap-4 sm:pt-8">
            <Button
              asChild
              size="lg"
              className="group bg-primary relative w-full overflow-hidden px-6 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:shadow-2xl sm:w-auto sm:px-8 sm:py-4 sm:text-base dark:bg-white dark:text-black"
            >
              <Link href="/projects">
                <Zap className="mr-2 h-4 w-4 text-white transition-transform group-hover:scale-110 dark:text-black" />
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 text-white transition-transform group-hover:translate-x-1 dark:text-black" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group border-border/60 bg-background/50 hover:bg-background/80 hover:border-primary/50 w-full px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              <Link href={`${siteConfig.links.email}` as never}>
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Floating Elements */}
      <div className="bg-primary/10 pointer-events-none absolute top-1/4 left-1/4 h-40 w-40 rounded-full blur-3xl select-none sm:h-64 sm:w-64" />
      <div className="bg-secondary/10 pointer-events-none absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full blur-3xl select-none sm:h-64 sm:w-64" />
    </section>
  );
}
