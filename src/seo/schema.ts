import type { SEOData } from "./types";
import { siteConfig } from "../config/site";

function buildOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: siteConfig.name,
    url: siteConfig.url,
  };
}

function buildWebsite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: siteConfig.name,
    url: siteConfig.url,
  };
}

function buildWebPage(seo: SEOData, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name: seo.title,
    description: seo.description,
    url,
  };
}

function buildSoftwareApplication(seo: SEOData, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: seo.title,
    applicationCategory: "Utility",
    operatingSystem: "Any",

    description: seo.description,
    url,
  };
}

function buildArticle(seo: SEOData, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: seo.title,
    description: seo.description,

    author: {
      "@type": "Person",
      name: seo.author ?? siteConfig.author,
    },

    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },

    datePublished: seo.publishDate?.toISOString(),

    dateModified:
      seo.updatedDate?.toISOString() ??
      seo.publishDate?.toISOString(),

    image: seo.image
      ? new URL(seo.image, siteConfig.url).toString()
      : new URL(siteConfig.defaultImage, siteConfig.url).toString(),
  };
}

function buildBreadcrumb(url: string, seo: SEOData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${siteConfig.url}/guides/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: seo.title,
        item: url,
      },
    ],
  };
}

export function createSchema(seo: SEOData) {
  const pageUrl = new URL(
    seo.canonical,
    siteConfig.url,
  ).toString();

  const schema: Record<string, unknown>[] = [
    buildOrganization(),
    buildWebsite(),
    buildWebPage(seo, pageUrl),
  ];

  if (seo.pageType === "article") {
    schema.push(buildArticle(seo, pageUrl));
  } else {
    schema.push(buildSoftwareApplication(seo, pageUrl));
  }

  schema.push(buildBreadcrumb(pageUrl, seo));

  return schema;
}