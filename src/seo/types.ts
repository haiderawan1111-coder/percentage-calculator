export type PageType = "website" | "article";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
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
  };

  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}