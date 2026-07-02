import { useEffect } from "react";

const SITE_URL = "https://arthuroliveira.dev";

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

// Per-page SEO: title, description, OG/Twitter, canonical. Scrolls to top on route change.
export default function SEO({ title, description, path = "" }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    if (title) {
      setMeta("property", "og:title", title);
      setMeta("name", "twitter:title", title);
    }
    setMeta("property", "og:url", SITE_URL + path);
    setCanonical(SITE_URL + path);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [title, description, path]);
  return null;
}
