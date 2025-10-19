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

export type BooleanString = "0" | "1";

export type InputPosition = "top" | "bottom";

export type Repo = `${string}/${string}`;

export type Mapping =
  | "url"
  | "title"
  | "og:title"
  | "specific"
  | "number"
  | "pathname";

export type GenericString = string & Record<never, never>;

export type Theme =
  | "light"
  | "light_high_contrast"
  | "light_protanopia"
  | "light_tritanopia"
  | "dark"
  | "dark_high_contrast"
  | "dark_protanopia"
  | "dark_tritanopia"
  | "dark_dimmed"
  | "preferred_color_scheme"
  | "transparent_dark"
  | "noborder_light"
  | "noborder_dark"
  | "noborder_gray"
  | "cobalt"
  | "purple_dark"
  | "gruvbox"
  | "gruvbox_dark"
  | "gruvbox_light"
  | "catppuccin_latte"
  | "catppuccin_frappe"
  | "catppuccin_macchiato"
  | "catppuccin_mocha"
  | "fro"
  | `https://${string}`
  | GenericString;

export type AvailableLanguage =
  | "ar"
  | "be"
  | "bg"
  | "ca"
  | "cs"
  | "da"
  | "de"
  | "en"
  | "eo"
  | "es"
  | "eu"
  | "fa"
  | "fr"
  | "gr"
  | "gsw"
  | "hbs"
  | "he"
  | "hu"
  | "id"
  | "it"
  | "ja"
  | "kh"
  | "ko"
  | "nl"
  | "pl"
  | "pt"
  | "ro"
  | "ru"
  | "th"
  | "tr"
  | "vi"
  | "uk"
  | "uz"
  | "zh-CN"
  | "zh-Hans"
  | "zh-Hant"
  | "zh-HK"
  | "zh-TW"
  | GenericString;

export type Loading = "lazy" | "eager";

export interface GiscusProps {
  id?: string;
  host?: string;
  repo: Repo;
  repoId: string;
  category?: string;
  categoryId?: string;
  mapping: Mapping;
  term?: string;
  theme?: Theme;
  strict?: BooleanString;
  reactionsEnabled?: BooleanString;
  emitMetadata?: BooleanString;
  inputPosition?: InputPosition;
  lang?: AvailableLanguage;
  loading?: Loading;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // Deklarasikan 'giscus-widget' di sini
      // Properti di sini harus sesuai dengan yang di-render di Giscus.tsx
      "giscus-widget": GiscusProps &
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
