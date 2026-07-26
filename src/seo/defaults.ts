import { siteConfig } from "../config/site";

export const seoDefaults = {
  locale: "en_US",

  siteName: siteConfig.name,

  imageWidth: 1200,

  imageHeight: 630,

  imageType: "image/png",

  twitterCard: "summary_large_image",

  imageAlt: siteConfig.name,

  defaultImage: `${siteConfig.url}${siteConfig.defaultImage}`,
} as const;