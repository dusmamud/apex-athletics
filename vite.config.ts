import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Inline the app stylesheet into a <style> block in the HTML head,
			// removing the render-blocking CSS request on every page.
			// The threshold is measured in UTF-16 code units on the RAW file,
			// not the compressed network size: the built CSS is ~57 KB raw
			// (10.2 KB over the wire), so 100000 leaves comfortable headroom.
			inlineStyleThreshold: 100000,
			// Inlined styles need ABSOLUTE asset URLs so the @fontsource
			// @font-face url() references keep resolving (SvelteKit fix for
			// the inlined-CSS url() bug, #16315, included in SvelteKit 3.2.0).
			// With relative URLs the fonts would 404 once inlined.
			paths: { relative: false },
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				precompress: false,
				strict: true
			})
		})
	]
});
