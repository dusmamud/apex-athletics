# APEX ATHLETICS

Gym website — dark theme, lime accent, same-to-same as the reference design
(`~/workspace/user/media_library/image/image-10.png`).

## Stack (locked)

Svelte 5.57.3, SvelteKit 3.2.0, Vite 8.3.8, TypeScript 6, Tailwind CSS 4.3.5
(`@tailwindcss/vite`), `@sveltejs/adapter-static` 4.0.1 + prerender. No
`svelte.config.js` — adapter config lives in `vite.config.ts`. `#lib` imports,
runes stores in `.svelte.ts`, lucide-svelte icons only, no emojis.

## Develop

```sh
npm install
npm run dev
npm run check   # svelte-check, must be 0 errors
npm run build   # static output in build/
npm run preview # serves build/ on port 4175
node scripts/verify-pages.mjs   # Playwright: routes, overflow, tap targets, interactions
```

## Deploy (parent to do)

- GitHub repo: `dusmamud/apex-athletics`
- Cloudflare Pages project: `apex-athletics`, build `npm run build`, output `build/`
- Photos: Unsplash (see `src/lib/data/gym.ts` — every ID verified HTTP 200).
  Contact details are demo data — replace before a real launch.
