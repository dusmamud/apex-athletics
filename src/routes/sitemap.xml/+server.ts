import { allRoutes } from '#lib/data/gym';

export const prerender = true;

const BASE = 'https://apex-athletics-gym.pages.dev';

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allRoutes
		.map((r) => `  <url><loc>${BASE}${r === '/' ? '' : r}</loc></url>`)
		.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
