import type { SEOData } from "./types";
import { siteConfig } from "../config/site";
import { createFAQSchema } from "./faq";

function toISODate(date?: Date) {
  if (!date || Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

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

    datePublished: toISODate(seo.publishDate),

    dateModified:
      toISODate(seo.updatedDate) ??
      toISODate(seo.publishDate),

    image: seo.image
      ? new URL(seo.image, siteConfig.url).toString()
      : new URL(siteConfig.defaultImage, siteConfig.url).toString(),
  };
}

function buildBreadcrumb(url: string, seo: SEOData) {
  const currentPage = {
    name: seo.title,
    url,
  };

  const breadcrumbItems = (seo.breadcrumbs ?? []).filter((item) => {
    const itemUrl = item.url.startsWith("http")
      ? item.url
      : new URL(item.url, siteConfig.url).toString();

    return itemUrl !== url;
  });

  const items = [
    {
      name: "Home",
      url: siteConfig.url,
    },
    ...breadcrumbItems,
    currentPage,
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : new URL(item.url, siteConfig.url).toString(),
    })),
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

  if (seo.faqs && seo.faqs.length > 0) {
    schema.push(createFAQSchema(seo.faqs));
  }

  return schema;
}