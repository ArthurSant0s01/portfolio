export const defaultSiteUrl = "https://arthuroliveira.dev";

export function normalizeSiteUrl(input) {
  const trimmed = input.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function resolveSiteUrl() {
  const siteUrl =
    process.env.VITE_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    defaultSiteUrl;

  return normalizeSiteUrl(siteUrl);
}

export const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/photography", changefreq: "monthly", priority: "0.8" },
  { path: "/videography", changefreq: "monthly", priority: "0.8" },
  { path: "/ai", changefreq: "monthly", priority: "0.8" },
  { path: "/resume", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
];
