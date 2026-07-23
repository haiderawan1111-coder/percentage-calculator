export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];

  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
  };

  robots?: {
    index?: boolean;
    follow?: boolean;
  };

  author?: string;
}