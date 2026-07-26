export type PageType = "website" | "article";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RobotsConfig {
  index?: boolean;
  follow?: boolean;

  maxSnippet?: number;
  maxImagePreview?: "none" | "standard" | "large";
  maxVideoPreview?: number;
}

export interface SEOData {
  title: string;

  description: string;

  canonical: string;

  keywords: string[];

  pageType?: PageType;

  author?: string;

  publishDate?: Date;

  updatedDate?: Date;

  image?: string;

  breadcrumbs?: BreadcrumbItem[];

  faqs?: FAQItem[];

  openGraph?: {
    title?: string;

    description?: string;

    image?: string;

    secureImage?: string;

    imageAlt?: string;

    imageWidth?: number;

    imageHeight?: number;

    imageType?: string;

    locale?: string;

    siteName?: string;

    url?: string;
  };

  twitter?: {
    card?: string;

    title?: string;

    description?: string;

    image?: string;

    imageAlt?: string;

    site?: string;

    creator?: string;
  };

  robots?: RobotsConfig;
}