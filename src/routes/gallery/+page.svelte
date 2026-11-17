<script lang="ts">
	import { ChevronLeft, ChevronRight, X } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { galleryImages, type GalleryImage } from '#lib/data/gym';

	const categories = ['All', 'Strength', 'Classes', 'Cardio', 'Functional', 'Mobility', 'Community'] as const;
	let filter = $state<(typeof categories)[number]>('All');
	let selected = $state<number | null>(null);

	const visible = $derived(
		filter === 'All' ? galleryImages : galleryImages.filter((g) => g.category === filter)
	);

	function openLightbox(img: GalleryImage) {
		selected = galleryImages.indexOf(img);
	}
	function close() {
		selected = null;
	}
	function step(dir: 1 | -1) {
		if (selected === null) return;
		selected = (selected + dir + galleryImages.length) % galleryImages.length;
	}
	function onKey(e: KeyboardEvent) {
		if (selected === null) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') step(1);
		if (e.key === 'ArrowLeft') step(-1);
	}
</script>

<svelte:head>
	<title>Photo Gallery — APEX ATHLETICS</title>
	<meta name="description" content="Inside APEX ATHLETICS: real photos of the strength floor, classes, cardio zone, turf and recovery suite." />
</svelte:head>

<svelte:window onkeydown={onKey} />

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">Inside the gym</p>
		<h1 class="section-title mt-2">Photo Gallery</h1>
		<p class="mt-4 leading-relaxed text-muted">
			Real photos, no stock-library gloss. Tap any photo to see it full size.
		</p>
	</div>

	<div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter photos by category">
		{#each categories as c (c)}
			<button
				type="button"
				aria-pressed={filter === c}
				onclick={() => (filter = c)}
				class="min-h-11 rounded-full border px-4 text-sm font-semibold transition {filter === c
					? 'border-lime bg-lime text-ink'
					: 'border-line bg-panel text-cream hover:border-lime hover:text-lime'}"
			>
				{c}
			</button>
		{/each}
	</div>

	<div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
		{#each visible as img, i (img.image)}
			<button
				type="button"
				onclick={() => openLightbox(img)}
				class="group relative min-w-0 overflow-hidden rounded-xl border border-line text-left focus-visible:outline-2 focus-visible:outline-lime"
				use:reveal={{ delay: (i % 3) * 90 }}
				aria-label="View photo: {img.caption}"
			>
				<img src={img.image} alt={img.caption} width="1200" height="800" loading="lazy" class="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" />
				<span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-3 pt-8 pb-3 text-xs font-semibold text-cream">
					{img.caption}
				</span>
			</button>
		{/each}
	</div>
</section>

{#if selected !== null}
	<div
		class="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4"
		role="dialog"
		aria-modal="true"
		aria-label="Photo viewer"
	>
		<button type="button" onclick={close} aria-label="Close photo viewer" class="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-md border border-line bg-panel text-cream transition hover:border-lime hover:text-lime">
			<X class="h-5 w-5" />
		</button>
		<button type="button" onclick={() => step(-1)} aria-label="Previous photo" class="absolute left-2 flex h-11 w-11 items-center justify-center rounded-md border border-line bg-panel text-cream transition hover:border-lime hover:text-lime sm:left-6">
			<ChevronLeft class="h-5 w-5" />
		</button>
		<img src={galleryImages[selected].image} alt={galleryImages[selected].caption} class="max-h-[80vh] w-auto max-w-full rounded-xl border border-line object-contain" />
		<button type="button" onclick={() => step(1)} aria-label="Next photo" class="absolute right-2 flex h-11 w-11 items-center justify-center rounded-md border border-line bg-panel text-cream transition hover:border-lime hover:text-lime sm:right-6">
			<ChevronRight class="h-5 w-5" />
		</button>
		<p class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-panel px-4 py-2 text-xs font-semibold whitespace-nowrap text-cream">
			{galleryImages[selected].caption} · {selected + 1} of {galleryImages.length}
		</p>
	</div>
{/if}
