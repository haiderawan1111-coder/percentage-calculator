import { seoDefaults } from "./defaults";
import type { SEOData } from "./types";

export function validateSEO(data: SEOData): void {
  if (import.meta.env.PROD) {
    return;
  }

  if (!data.title.trim()) {
    console.warn("[SEO] Missing title");
  }

  if (!data.description.trim()) {
    console.warn("[SEO] Missing description");
  }

  const image =
    data.openGraph?.image ??
    data.image ??
    seoDefaults.defaultImage;

  if (!image.startsWith("https://")) {
    console.warn(
      "[SEO] Open Graph image should use an absolute HTTPS URL."
    );
  }

  if (
    !/\.(png|jpg|jpeg|webp|avif)$/i.test(image)
  ) {
    console.warn(
      "[SEO] Unexpected OG image extension."
    );
  }
}