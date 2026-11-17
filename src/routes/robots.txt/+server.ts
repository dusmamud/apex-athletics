export const prerender = true;

export function GET() {
	return new Response('User-agent: *\nAllow: /\nSitemap: https://apex-athletics-gym.pages.dev/sitemap.xml\n', {
		headers: { 'Content-Type': 'text/plain' }
	});
}
