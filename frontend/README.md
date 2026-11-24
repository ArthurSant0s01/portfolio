# Portfolio frontend

The frontend for [Arthur Santos' portfolio](https://arthur-santos.vercel.app).

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Framer Motion
- Recharts

## Requirements

- Node.js
- npm

## Development

From this directory:

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Production build

```bash
npm run build
npm run preview
```

The `prebuild` script generates SEO assets before Vite builds the application.

## Available scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Generate SEO assets and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run seo:generate` | Generate SEO assets |

## Environment variables and secrets

Do not commit local environment files or real credentials.

Any variable with the `VITE_` prefix is exposed to the browser after the build. Only use it for values that are safe to make public. Never put service-role keys, private API keys, passwords or privileged tokens in frontend variables.

Use server-side environment variables in a trusted backend or hosting environment for private credentials.
