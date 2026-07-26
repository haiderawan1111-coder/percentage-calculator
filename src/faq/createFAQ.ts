import type { FAQItem, FAQSection } from "./types";

export function createFAQ(items: FAQItem[]): FAQSection {
  return {
    items,
  };
}