import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
export default defineConfig({
  site: "https://www.shufo.dev/",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
    sitemap(),
    vue(),
    astroImageTools,
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  vite: {
    // Let the library user control minification in their own bundler
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
