<script lang="ts">
	import { Check, Dumbbell } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { facilities } from '#lib/data/gym';
	import { imgSrcSet } from '#lib/img';
</script>

<svelte:head>
	<title>Facilities & Equipment — APEX ATHLETICS</title>
	<meta name="description" content="Inside APEX ATHLETICS: strength floor, cardio zone, functional turf and recovery suite — 6,000 sq ft of equipment in New York." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">The gym</p>
		<h1 class="section-title mt-2">Facilities & Equipment</h1>
		<p class="mt-4 leading-relaxed text-muted">
			6,000 sq ft across four zones, kept clean and maintained daily. Every piece of equipment
			is here for a reason — and a coach can show you how to use it.
		</p>
	</div>

	<div class="mt-10 grid gap-6 lg:grid-cols-2">
		{#each facilities as zone, i (zone.name)}
			<article class="card min-w-0 overflow-hidden" use:reveal={{ delay: (i % 2) * 90 }}>
				<div class="overflow-hidden">
					<img
						src={zone.image}
						srcset={imgSrcSet(zone.image, [640, 960, 1200])}
						sizes="(max-width: 1024px) 100vw, 50vw"
						alt={zone.name}
						width="1200"
						height="800"
						loading="lazy"
						class="aspect-[16/9] w-full object-cover transition duration-300 hover:scale-105"
					/>
				</div>
				<div class="p-6">
					<h2 class="font-display flex items-center gap-2 text-2xl font-semibold tracking-wide text-cream uppercase">
						<Dumbbell class="h-5 w-5 text-lime" /> {zone.name}
					</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{zone.blurb}</p>
					<ul class="mt-4 space-y-2.5">
						{#each zone.equipment as item (item)}
							<li class="flex items-start gap-2.5 text-sm text-cream/90">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} />
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			</article>
		{/each}
	</div>

	<div class="mt-10 grid gap-4 sm:grid-cols-3" use:reveal>
		<div class="card p-5 text-center"><p class="font-display text-3xl font-semibold text-lime">6,000</p><p class="mt-1 text-sm text-muted">sq ft of training space</p></div>
		<div class="card p-5 text-center"><p class="font-display text-3xl font-semibold text-lime">120+</p><p class="mt-1 text-sm text-muted">pieces of equipment</p></div>
		<div class="card p-5 text-center"><p class="font-display text-3xl font-semibold text-lime">4</p><p class="mt-1 text-sm text-muted">dedicated training zones</p></div>
	</div>

	<div class="mt-10 text-center" use:reveal>
		<a href="/book-a-tour" class="btn-lime">Book a Free Tour</a>
		<a href="/gallery" class="btn-ghost ml-3">See the Gallery</a>
	</div>
</section>
