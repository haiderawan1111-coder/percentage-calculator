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

function buildBreadcrumb() {
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

  if (seo.pageType !== "article") {
    schema.push(
      buildSoftwareApplication(seo, pageUrl),
    );
  }

  schema.push(buildBreadcrumb());

  return schema;
}