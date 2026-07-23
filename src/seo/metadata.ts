import type { SEOData } from "./types";

export function createSEO(data: SEOData): SEOData {
  return {
    ...data,

    openGraph: {
      title: data.openGraph?.title ?? data.title,
      description: data.openGraph?.description ?? data.description,
      image: data.openGraph?.image ?? "/og-image.png",
    },

    robots: {
      index: data.robots?.index ?? true,
      follow: data.robots?.follow ?? true,
    },

    author: data.author ?? "Percentage Calculator",
  };
}