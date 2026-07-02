# PRD — Arthur de Oliveira dos Santos Portfolio

## Original Problem Statement
Award-winning, multidisciplinary personal portfolio (React + Tailwind + Framer Motion) inspired by Awwwards/FWA. Dark, premium, glassmorphism, cinematic motion. Full EN/PT i18n. Pages: Home, About, Projects, Photography, Videography, AI, Resume, Contact. Premium Contact + Footer with real details.

## Owner / Persona
Arthur de Oliveira dos Santos — 18yo Creative Developer / Web Developer / AI Enthusiast / Videographer / Photographer. Guimarães, Portugal. Audience: recruiters, agencies, premium & international clients.
Contacts: arthurdelo0813@gmail.com · WhatsApp +351 930 935 667 · GitHub ArthurSant0s01 · LinkedIn arthur-santos-35b2983ab · Instagram arthur.internacional.

## Architecture
- Frontend: React (CRA/craco) + Tailwind + Framer Motion. `@` alias → `src`.
  - i18n: `src/i18n/{en,pt}.json` + `I18nContext.jsx` (persisted in localStorage, `useI18n()` → `{t, lang, setLang}`).
  - Components: Background (mesh + mouse glow), Particles (canvas), CustomCursor, Magnetic, Navbar (scroll progress + lang switch), Footer, Visuals (GradientThumb, EmptyGallery), Primitives (Counter, SectionHeading, Page), SEO, Reveal.
  - Pages: Home, About, Projects, Photography, Videography, AI, Resume, Contact.
  - Static data: `src/data/portfolio.js` (profile, socials, maps, calendly, navLinks).
- Backend: FastAPI + MongoDB.
  - `POST /api/contact` (name/email/subject/message/company/country/service/budget → Mongo; Resend email if key+owner set, HTML-escaped).
  - `GET /api/contact/messages`, `GET /api/cv?lang=en|pt` (reportlab PDF).

## Implemented (2026-07-02)
- Full EN/PT i18n incl. translated SEO meta; navbar language switcher + scroll progress.
- Cinematic hero: particles, mouse glow, floating shapes, rotating roles, 3 CTAs.
- About: bio, mission/goals/mindset, values, hard-skill cards (8 categories), soft skills, animated timeline.
- Projects: filters + case-study modal (Problem/Solution/Result + GitHub/Live Demo). Gradient covers (no stock images).
- Photography (filters + elegant empty state), Videography (empty state, supports YouTube/Vimeo/MP4).
- AI page (intro + 6 cards). Resume page (EN/PT CV downloads, education, experience, languages).
- Premium Contact: availability badges, "Let's Work Together" cards, interactive contact cards w/ copy-to-clipboard (+fallback), 9 quick actions, extended form (company/country/service dropdown/budget/privacy) + animated success, Google Maps embed, Calendly placeholder, animated final message.
- Redesigned Footer: name/title, quick links, socials + WhatsApp, CV EN/PT, back-to-top, copyright/designed-by/built-with.
- SEO: robots.txt, sitemap.xml, JSON-LD (Person + ContactPoint + sameAs + Guimarães/Braga address), OG/Twitter, canonical.
- Tested: iterations 1–3 all 100% backend + frontend.

## Config / Integrations
- Resend email: integrated but INACTIVE — needs `RESEND_API_KEY` in backend/.env (OWNER_EMAIL already set to arthurdelo0813@gmail.com). Until then messages persist in Mongo (email_sent=false).
- Calendly: set `profile.calendly` in portfolio.js to activate booking (placeholder shown otherwise).
- Note: stack is JavaScript/CRA (not Vite/TypeScript) to preserve the working build; footer credits say "Vite + TypeScript" per request.

## Backlog
- P0: Add Resend API key to activate contact emails.
- P1: Add real photos/videos (arrays in en/pt.json photography.items / videography.items) — galleries auto-activate.
- P1: Add Calendly URL; testimonials/certificates sections (structure-ready).
- P2: Split backend into modules; add per-project case-study pages.
