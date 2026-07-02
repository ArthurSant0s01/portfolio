# PRD — Arthur de Oliveira dos Santos Portfolio

## Original Problem Statement
Premium, minimalist, highly responsive dark-theme portfolio (React + Tailwind + Framer Motion), inspired by Awwwards-winning agency sites. Glassmorphism, blue/purple/cyan gradients, smooth animations, SEO optimized, high performance.
Pages: Home, Sobre, Projetos, Vídeos, Fotografia, Competências, Contacto.
Features: hero with background video, animated cards, experience timeline, statistics, CV download, contact form, elegant footer.

## Owner / Persona
Arthur de Oliveira dos Santos — 18yo Creative Developer / Videographer / Photographer / AI Enthusiast, based in Portugal. Audience: recruiters, agencies, premium clients.

## Architecture
- Frontend: React (CRA/craco) + Tailwind + Framer Motion. `@` alias → `src`.
  - `src/data/portfolio.js` — single source of content/media (easy to replace images/videos/text).
  - Components: CustomCursor, Navbar, Footer, Reveal/MeshBackground, Primitives (Counter, SectionHeading, Page), SEO.
  - Pages: Home, About, Projects, Videos, Photography, Skills, Contact (react-router-dom, animated page transitions).
- Backend: FastAPI + MongoDB.
  - `POST /api/contact` — stores message in Mongo; sends email via Resend if `RESEND_API_KEY`+`OWNER_EMAIL` set (HTML-escaped).
  - `GET /api/contact/messages` — list messages.
  - `GET /api/cv` — generates CV PDF via reportlab.

## Implemented (2026-07-02)
- All 7 pages with premium dark UI, glassmorphism, gradient typography, custom cursor, scroll reveals, animated mesh background.
- Hero with autoplay background video + poster fallback.
- Services grid, animated stat counters, experience timeline, animated skill/language bars.
- Projects with category filters + detail modal; Videos lightbox; Photography masonry lightbox.
- CV download (real PDF from backend) on navbar/hero/about.
- Contact form → backend (stores in Mongo, success toast, validation).
- SEO meta/OG tags + per-page titles/descriptions.
- Tested: backend 100%, frontend 100% (iteration_1).

## Config / Integrations
- Resend email: NOT yet active. Needs `RESEND_API_KEY` + `OWNER_EMAIL` in backend/.env. Until then contact messages are stored in Mongo only (email_sent=false).
- Placeholder social links + email in `src/data/portfolio.js` (profile.socials, profile.email) — replace with real ones.

## Backlog
- P0: Add real Resend key + owner email; replace placeholder social/email links.
- P1: Replace stock media with Arthur's real photos/videos; add real CV content.
- P1: Testimonials section (data structure ready in portfolio.js, empty).
- P2: Blog / case studies, contact rate-limiting, sitemap.xml + robots.txt.
