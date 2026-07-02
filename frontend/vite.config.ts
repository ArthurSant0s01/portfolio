import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

function normalizeSiteUrl(input: string) {
  const trimmed = input.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = normalizeSiteUrl(
    env.VITE_SITE_URL ||
      env.SITE_URL ||
      env.VERCEL_PROJECT_PRODUCTION_URL ||
      env.VERCEL_URL ||
      "https://arthuroliveira.dev",
  );
  const ogImageUrl = `${siteUrl}/og-image.png`;

  return {
    plugins: [
      react(),
      {
        name: "portfolio-seo-index-transform",
        transformIndexHtml(html) {
          return html
            .replaceAll("__SITE_URL__", siteUrl)
            .replaceAll("__OG_IMAGE_URL__", ogImageUrl);
        },
      },
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 3000,
      strictPort: true,
    },
    preview: {
      port: 4173,
      strictPort: true,
    },
    build: {
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (id.includes("lucide-react")) return "icons-vendor";
            if (id.includes("framer-motion")) return "motion-vendor";
            if (
              id.includes("@radix-ui") ||
              id.includes("sonner") ||
              id.includes("cmdk") ||
              id.includes("vaul") ||
              id.includes("input-otp") ||
              id.includes("embla-carousel-react") ||
              id.includes("react-hook-form") ||
              id.includes("zod") ||
              id.includes("class-variance-authority") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge") ||
              id.includes("react-resizable-panels")
            ) {
              return "ui-vendor";
            }
            if (
              id.includes("@tanstack/react-query") ||
              id.includes("react-router") ||
              id.includes("react-dom") ||
              /[\\/]react[\\/]/.test(id) ||
              id.includes("scheduler")
            ) {
              return "react-core";
            }
            return "vendor";
          },
        },
      },
    },
  };
});