export const SEO_BRAND_TITLE = "Arthur Santos | Portfolio";

export const SEO_DESCRIPTION =
  "Official portfolio of Arthur Santos, Creative Developer based in Portugal. Explore my projects in Web Development, React, TypeScript, Artificial Intelligence, Photography and Videography.";

export const SEO_OG_DESCRIPTION =
  "Creative Developer based in Portugal specialized in Web Development, AI, Photography and Videography.";

export const SEO_KEYWORDS =
  "Arthur Santos, Arthur Santos Portfolio, Arthur Santos Portugal, Creative Developer, Web Developer, Frontend Developer, Full Stack Developer, React Developer, TypeScript, Artificial Intelligence, Photography, Videography, Portugal, Guimarães";

export const SEO_AUTHOR = "Arthur Santos";

export const SEO_OG_IMAGE_ALT = "Arthur Santos | Portfolio preview image";
export const DEFAULT_SITE_URL = "https://arthuroliveira.dev";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const DEFAULT_OG_IMAGE_WIDTH = "1200";
export const DEFAULT_OG_IMAGE_HEIGHT = "630";

export function normalizeSiteUrl(input: string) {
  const trimmed = input.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function getCanonicalBaseUrl() {
  const envUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  if (envUrl && envUrl.trim()) {
    return normalizeSiteUrl(envUrl);
  }

  if (import.meta.env.PROD && typeof window !== "undefined") {
    return window.location.origin.replace(/\/$/, "");
  }

  return DEFAULT_SITE_URL;
}
