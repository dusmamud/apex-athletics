<script lang="ts">
	import { reveal } from '#lib/reveal';
	import { coaches } from '#lib/data/gym';
	import { imgSrcSet } from '#lib/img';
</script>

<svelte:head>
	<title>Meet Our Coaches — APEX ATHLETICS</title>
	<meta
		name="description"
		content="Meet the APEX ATHLETICS coaching team: Alex Chen, Maria Rodriguez and David Park — certified strength, HIIT and performance coaches."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">The team</p>
		<h1 class="section-title mt-2">Meet Our Coaches</h1>
		<p class="mt-4 leading-relaxed text-muted">
			Great coaching is the difference between training and just exercising. Our coaches are
			certified, experienced and — most importantly — they show up for you.
		</p>
	</div>

	<div class="mt-10 grid gap-5 md:grid-cols-3">
		{#each coaches as coach, i (coach.slug)}
			<a href="/coaches/{coach.slug}" class="card group block min-w-0 overflow-hidden" use:reveal={{ delay: i * 70 }}>
				<img
					src={coach.image}
					srcset={imgSrcSet(coach.image, [400, 480, 800, 1000])}
					sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 2.5rem), 392px"
					alt="Coach {coach.name}"
					width="1000"
					height="1000"
					loading="lazy"
					class="aspect-[4/3] w-full object-cover object-center transition duration-500 group-hover:scale-105"
				/>
				<div class="p-6">
					<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase group-hover:text-lime">
						{coach.name}
					</h2>
					<p class="mt-1 text-sm font-medium text-lime">{coach.role}</p>
					<p class="mt-1 text-xs text-muted">{coach.credentials} · {coach.experience}</p>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each coach.specialties as spec (spec)}
							<span class="chip">{spec}</span>
						{/each}
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>
