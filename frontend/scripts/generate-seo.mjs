import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveSiteUrl, routes } from "./seo.config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");

const siteUrl = resolveSiteUrl();
const lastmod = new Date().toISOString();

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((route) => {
    const loc = `${siteUrl}${route.path}`;
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${route.changefreq}</changefreq><priority>${route.priority}</priority></url>`;
  })
  .join("\n")}\n</urlset>\n`;

const robotsTxt = `User-agent: *\nAllow: /\n\nHost: ${siteUrl}\nSitemap: ${siteUrl}/sitemap.xml\n`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

console.log(`Generated sitemap.xml and robots.txt for ${siteUrl}`);
