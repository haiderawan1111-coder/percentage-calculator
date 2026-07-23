import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const guides = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/guides",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),

    author: z.string().default("QuickCalc Tools"),

    draft: z.boolean().default(false),

    tags: z.array(z.string()).default([]),

    category: z.string(),

    image: z.string().optional(),

    readingTime: z.number().optional(),

    featured: z.boolean().default(false),
  }),
});

const faq = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/faq",
  }),

  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().optional(),
  }),
});

const glossary = defineCollection({
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    category: z.string().optional(),
  }),
});

const comparisons = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),

    leftItem: z.string(),
    rightItem: z.string(),
  }),
});

export const collections = {
  guides,
  faq,
  glossary,
  comparisons,
};