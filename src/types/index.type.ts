import { Metadata } from "next";

export type TActionResult<TData> =
  | {
      status: true;
      message: string;
      data: TData;
    }
  | {
      status: false;
      message: string;
      errors: Record<string, string>;
    }
  | {
      status: false;
      message: string;
      errors: null;
    };

export type SocialLink = {
  label: string;
  url: string;
  icon?: string; // name for icon library if needed later
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export interface SiteConfig {
  siteName: string;
  domain: string;
  description: string;

  about: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  author: string;
  author_img: string;

  theme: {
    default: "light" | "dark";
    allowSystem: boolean;
  };
  links: {
    website: string;
    github: string;
    linkedin: string;
    tips: string;
    email: string;
  };
  social: SocialLink[];
  navigation: NavItem[];
  icons: Metadata["icons"];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonical?: string;
    image?: string; // default og image
    imageAlt?: string;
    locale?: string;
    type?: string;
    twitterCard?: string;
    robots?: string;
    themeColor?: string;
  };
}
