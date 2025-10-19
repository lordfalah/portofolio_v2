// Please note Some data Below are Just Placeholder for now due to active development
import { SiteConfig } from "@/types/index.type";
import type { Metadata } from "next";

export const siteConfig: SiteConfig = {
  siteName: "Irfin Falah",
  domain: "portofolio-lyart-six.vercel",
  author: "Irfin Falah",
  description:
    "Full Stack developer creating useful & delightful web experiences",
  about:
    "My personal blog and portfolio website built with passion and a lot of stress. I spend my spare time building free apps & tools. Always open to collaboration & new challenges.",
  author_img: "https://avatars.githubusercontent.com/u/63539071?v=4",
  keywords: [
    "Irfin Falah",
    "Full Stack Developer",
    "Portfolio",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "shadcn/ui",
    "Framer Motion",
  ],
  ogImage: "/og.png",
  twitterHandle: "@Falhalla_",

  theme: {
    default: "dark",
    allowSystem: true,
  },
  links: {
    website:
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://portofolio-lyart-six.vercel.app/",
    github: "https://github.com/lordfalah",
    linkedin: "https://www.linkedin.com/in/irfinfalah/",
    tips: "https://pay.muhammadfiaz.com",
    email: "mailto:irfin0falah@gmail.com",
  },
  social: [
    {
      label: "GitHub",
      url: "https://github.com/lordfalah",
      icon: "github",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/irfinfalah/",
      icon: "linkedin",
    },
    {
      label: "Website",
      url: "https://portofolio-lyart-six.vercel.app",
      icon: "globe",
    },
    {
      label: "Tip",
      url:
        process.env.NEXT_PUBLIC_SITE_URL ??
        "https://portofolio-lyart-six.vercel.app",
      icon: "coffee",
    },
  ],
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Posts", href: "/posts" },
    { label: "Chat", href: "/chat" },
    { label: "Contact", href: "/contact" },
  ],

  seo: {
    title: "Irfin Falah",
    description:
      "Full Stack developer creating useful & delightful web experiences. Exploring ML & AI.",
    keywords: [
      "Irfin Falah",
      "Full Stack Developer",
      "Portfolio",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "Framer Motion",
      "Machine Learning",
      "AI",
    ],
    canonical:
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://portofolio-lyart-six.vercel.app",
    image: "/og.png",
    imageAlt: "Irfin Falah - Full Stack Developer",
    locale: "en-US",
    type: "website",
    twitterCard: "summary_large_image",
    robots: "index,follow",
    themeColor: "#0f172a",
  },

  icons: {
    icon: [
      {
        url: "/favicon/light/android-512x512.png",
        sizes: "512x512",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon/light/android-192x192.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon/light/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },

      {
        url: "/favicon/light/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },

      {
        url: "/favicon/dark/android-512x512.png",
        sizes: "512x512",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/dark/android-192x192.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },

      {
        url: "/favicon/dark/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },

      {
        url: "/favicon/dark/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },

      {
        url: "/favicon/dark/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/light/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/favicon/light/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon/dark/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const { seo, siteName, domain, icons } = siteConfig;

  const base: Metadata = {
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
    },

    icons,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: siteConfig.author, url: siteConfig.links.website }],
    metadataBase: new URL(`https://${domain}`),
    alternates: { canonical: seo.canonical ?? `https://${domain}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical ?? `https://${domain}`,
      siteName,
      images: seo.image ? [seo.image] : [],
      type: seo.type ?? "website",
      locale: seo.locale,
    },
    twitter: {
      card: seo.twitterCard ?? "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image] : [],
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },
    other: {
      robots: seo.robots,
      "theme-color": seo.themeColor,
      "og:image:alt": seo.imageAlt,
    },
  } as Metadata;

  return { ...base, ...overrides };
}

export type { Metadata };
