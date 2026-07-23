import type { SEOData } from "./types";
import { siteConfig } from "../config/site";

export function createSchema(seo: SEOData) {
  const siteUrl = new URL(seo.canonical, siteConfig.url).toString();

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",

      name: siteConfig.name,

      url: siteConfig.url,
    },

    {
      "@context": "https://schema.org",
      "@type": "WebSite",

      name: siteConfig.name,

      url: siteConfig.url,
    },

    {
      "@context": "https://schema.org",
      "@type": "WebPage",

      name: seo.title,

      description: seo.description,

      url: siteUrl,
    },

    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",

      name: seo.title,

      applicationCategory: "Utility",

      operatingSystem: "Any",

      description: seo.description,

      url: siteUrl,
    },

    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",

      itemListElement: [
        {
          "@type": "ListItem",

          position: 1,

          name: "Home",

          item: siteConfig.url,
        },
      ],
    },
  ];
}