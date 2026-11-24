# Arthur Santos — Portfolio

Official portfolio and source code for [arthur-santos.vercel.app](https://arthur-santos.vercel.app).

I am a Creative Developer based in Portugal, currently studying Data Science at the University of Minho. I build responsive web experiences and digital products, combining software development, interface design and practical problem-solving.

## What you can find here

- **Web development:** responsive websites, landing pages and web applications.
- **Product development:** independent projects focused on productivity and useful digital tools.
- **AI and automation:** experiments and integrations that apply AI to practical workflows.
- **Creative work:** photography, videography and digital content.

## Technology

The portfolio frontend currently uses:

- React 19 and TypeScript
- Vite
- Tailwind CSS
- Radix UI and Lucide
- Framer Motion
- Recharts

## Run locally

Requirements: Node.js and npm.

```bash
cd frontend
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

The build runs the SEO generation script automatically through the `prebuild` lifecycle.

## Project structure

```text
.
├── frontend/
│   ├── public/
│   ├── scripts/
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md
```

## Security

- Never commit real credentials, API keys, access tokens, private keys or production data.
- Keep local environment files out of Git. The repository ignore rules cover common `.env`, credential and key files.
- Treat every variable prefixed with `VITE_` as public: Vite embeds these values in the client bundle.
- Never place service-role keys, database passwords or other privileged credentials in frontend code.
- Use hosting-provider environment variables for server-side secrets.
- If a credential is exposed, revoke or rotate it immediately. Removing it from the latest commit does not invalidate a leaked credential.

See [SECURITY.md](SECURITY.md) for the repository security policy.

## Links

- **Live portfolio:** https://arthur-santos.vercel.app
- **GitHub:** https://github.com/ArthurSant0s01
- **LinkedIn:** https://www.linkedin.com/in/arthur-santos-35b2983ab

---

This repository documents the portfolio implementation. For the latest work and selected projects, use the live portfolio.
