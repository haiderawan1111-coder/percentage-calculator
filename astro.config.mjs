import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://quickcalctools.com",

  integrations: [
    sitemap(),

    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: true,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});