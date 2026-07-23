import { siteConfig } from "../config/site";

import type { SEOData } from "./types";

export function createSEO(data: SEOData): SEOData {
  return {
    ...data,

    pageType: data.pageType ?? "website",

    openGraph: {
      title: data.openGraph?.title ?? data.title,
      description: data.openGraph?.description ?? data.description,
      image:
        data.openGraph?.image ??
        `${siteConfig.url}${siteConfig.defaultImage}`,
    },

    robots: {
      index: data.robots?.index ?? true,
      follow: data.robots?.follow ?? true,
    },

    author: data.author ?? siteConfig.author,
  };
}