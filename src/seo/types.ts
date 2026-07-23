export type PageType = "website" | "article";

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