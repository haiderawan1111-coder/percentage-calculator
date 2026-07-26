import { siteConfig } from "../config/site";

import { seoDefaults } from "./defaults";
import type { SEOData } from "./types";
import { validateSEO } from "./validate";

function sanitizeDescription(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.]{2,}/g, ".");
}

function normalizeCanonical(url: string): string {
  const base = siteConfig.url.replace(/\/+$/, "");

  let path = url.trim();

  if (!path.startsWith("http")) {
    path = "/" + path.replace(/^\/+/, "");
    path = path.replace(/\/+/g, "/");

    if (!path.endsWith("/")) {
      path += "/";
    }

    return `${base}${path}`;
  }

  return url.replace(/([^:]\/)\/+/g, "$1");
}

export function createSEO(data: SEOData): SEOData {
  validateSEO(data);

  const title = data.title.includes(siteConfig.name)
    ? data.title
    : `${data.title} | ${siteConfig.name}`;

  const description = sanitizeDescription(data.description);

  const canonical = normalizeCanonical(data.canonical);

  return {
    ...data,

    title,

    description,

    canonical,

    pageType: data.pageType ?? "website",

    openGraph: {
      title: data.openGraph?.title ?? title,

      description:
        data.openGraph?.description ?? description,

      image:
        data.openGraph?.image ??
        data.image ??
        seoDefaults.defaultImage,

      secureImage:
        data.openGraph?.secureImage ??
        data.openGraph?.image ??
        data.image ??
        seoDefaults.defaultImage,

      imageAlt:
        data.openGraph?.imageAlt ??
        title,

      imageWidth:
        data.openGraph?.imageWidth ??
        seoDefaults.imageWidth,

      imageHeight:
        data.openGraph?.imageHeight ??
        seoDefaults.imageHeight,

      imageType:
        data.openGraph?.imageType ??
        seoDefaults.imageType,

      locale:
        data.openGraph?.locale ??
        seoDefaults.locale,

      siteName:
        data.openGraph?.siteName ??
        seoDefaults.siteName,

      url:
        data.openGraph?.url ??
        canonical,
    },

    twitter: {
      card:
        data.twitter?.card ??
        seoDefaults.twitterCard,

      title:
        data.twitter?.title ??
        data.openGraph?.title ??
        title,

      description:
        data.twitter?.description ??
        data.openGraph?.description ??
        description,

      image:
        data.twitter?.image ??
        data.openGraph?.image ??
        data.image ??
        seoDefaults.defaultImage,

      imageAlt:
        data.twitter?.imageAlt ??
        data.openGraph?.imageAlt ??
        title,

      site:
        data.twitter?.site ??
        siteConfig.social.twitter,

      creator:
        data.twitter?.creator ??
        siteConfig.social.twitter,
    },

    robots: {
      index: data.robots?.index ?? true,

      follow: data.robots?.follow ?? true,

      maxSnippet: data.robots?.maxSnippet ?? -1,

      maxImagePreview:
        data.robots?.maxImagePreview ?? "large",

      maxVideoPreview:
        data.robots?.maxVideoPreview ?? -1,
    },

    author: data.author ?? siteConfig.author,
  };
}