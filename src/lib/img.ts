// Responsive image helpers for Unsplash-hosted photos.
//
// All gym photos are served through the Unsplash image API (`images.unsplash.com`)
// with `q=80&auto=format&fit=crop`. `auto=format` makes the CDN negotiate the
// best format the browser accepts (AVIF, then WebP, then JPEG) — that is the
// Unsplash-recommended equivalent of an `fm=avif` + fallback chain, which cannot
// be expressed per-candidate inside a `srcset`.
//
// `imgSrcSet` rebuilds the same photo at several widths so the browser can pick
// the smallest candidate that still covers the rendered slot (see the `sizes`
// attribute on each <img>). Width/height attributes on the <img> stay at the
// original values so the browser reserves the aspect-ratio box (no CLS).

export function imgSrcSet(src: string, widths: number[]): string {
	const base = src.split('?')[0];
	return widths.map((w) => `${base}?q=80&w=${w}&auto=format&fit=crop ${w}w`).join(', ');
}
