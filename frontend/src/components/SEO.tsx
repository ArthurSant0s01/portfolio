import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SEO_AUTHOR,
  SEO_BRAND_TITLE,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  SEO_OG_IMAGE_ALT,
  SEO_OG_DESCRIPTION,
  getCanonicalBaseUrl,
} from "@/lib/seo";

function getAbsoluteUrl(baseUrl, path) {
  if (!path || path === "/") return `${baseUrl}/`;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function setTitle(title) {
  document.title = title || SEO_BRAND_TITLE;
}

function setMeta(attr, key, content) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function setJsonLd(baseUrl) {
  const scriptId = "seo-person-jsonld";
  let scriptTag = document.getElementById(scriptId);
  if (!scriptTag) {
    scriptTag = document.createElement("script");
    scriptTag.id = scriptId;
    scriptTag.setAttribute("type", "application/ld+json");
    document.head.appendChild(scriptTag);
  }

  const payload = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arthur Santos",
    jobTitle: "Creative Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guimarães",
      addressCountry: "Portugal",
    },
    homeLocation: {
      "@type": "Place",
      name: "Guimarães, Portugal",
    },
    url: baseUrl,
    sameAs: [
      "https://github.com/ArthurSant0s01",
      "https://www.linkedin.com/in/arthur-santos-35b2983ab",
      "https://instagram.com/arthur.internacional",
      "mailto:arthurdelo0813@gmail.com",
    ],
    email: "mailto:arthurdelo0813@gmail.com",
  };

  scriptTag.textContent = JSON.stringify(payload);
}

// Per-page SEO: title, description, OG/Twitter, canonical, robots and JSON-LD.
export default function SEO({ title, description, path = "", noIndex = false }) {
  useEffect(() => {
    const baseUrl = getCanonicalBaseUrl();
    const pageUrl = getAbsoluteUrl(baseUrl, path);
    const pageTitle = title || SEO_BRAND_TITLE;
    const pageDescription = description || SEO_DESCRIPTION;
    const ogImage = getAbsoluteUrl(baseUrl, DEFAULT_OG_IMAGE);

    setTitle(pageTitle);
    setMeta("name", "description", pageDescription);
    setMeta("name", "keywords", SEO_KEYWORDS);
    setMeta("name", "author", SEO_AUTHOR);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", "en_US");
    setMeta("property", "og:site_name", SEO_BRAND_TITLE);
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription || SEO_OG_DESCRIPTION);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:alt", SEO_OG_IMAGE_ALT);
    setMeta("property", "og:image:type", "image/png");
    setMeta("property", "og:image:width", DEFAULT_OG_IMAGE_WIDTH);
    setMeta("property", "og:image:height", DEFAULT_OG_IMAGE_HEIGHT);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription || SEO_OG_DESCRIPTION);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", SEO_OG_IMAGE_ALT);

    setCanonical(pageUrl);
    setJsonLd(baseUrl);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [title, description, path, noIndex]);

  return null;
}
