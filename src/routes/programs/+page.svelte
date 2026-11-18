<script lang="ts">
	import { reveal } from '#lib/reveal';
	import { programs } from '#lib/data/gym';
	import { imgSrcSet } from '#lib/img';
</script>

<svelte:head>
	<title>Training Programs — APEX ATHLETICS</title>
	<meta
		name="description"
		content="Strength training, personal training, HIIT and conditioning at APEX ATHLETICS. Structured programs, small groups, expert coaches."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">What we do</p>
		<h1 class="section-title mt-2">Training Programs</h1>
		<p class="mt-4 leading-relaxed text-muted">
			Every program is coached, structured and tracked. No random workouts, no guessing — just a
			plan that moves you forward, week after week.
		</p>
	</div>

	<div class="mt-10 grid gap-5 sm:grid-cols-2">
		{#each programs as program, i (program.slug)}
			<article class="card flex min-w-0 flex-col overflow-hidden sm:flex-row" use:reveal={{ delay: i * 60 }}>
				<img
					src={program.image}
					srcset={imgSrcSet(program.image, [320, 480, 800, 960, 1200])}
					sizes="(max-width: 640px) calc(100vw - 2rem), 224px"
					alt="{program.name} at APEX ATHLETICS"
					width="1200"
					height="800"
					loading="lazy"
					class="aspect-[16/9] w-full object-cover sm:aspect-auto sm:w-56 sm:shrink-0"
				/>
				<div class="flex min-w-0 flex-1 flex-col p-6">
					<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">
						{program.name}
					</h2>
					<p class="mt-1 text-sm font-medium text-lime">{program.tagline}</p>
					<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{program.description}</p>
					<p class="mt-3 text-xs font-semibold text-cream/80">
						{program.duration} · {program.level} · {program.calories} · Coach {program.coach}
					</p>
					<!-- See home page: Lighthouse's SEO audit reads rendered innerText, not
					     aria-label, so the program name is real (visually hidden) text. -->
					<a href="/programs/{program.slug}" class="btn-lime mt-5 w-full sm:w-auto"
						>Learn More <span class="sr-only">about {program.name}</span></a
					>
				</div>
			</article>
		{/each}
	</div>

	<div class="card mt-10 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center" use:reveal>
		<div>
			<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">
				Not sure where to start?
			</h2>
			<p class="mt-1 text-sm text-muted">
				Book a free assessment and a coach will recommend the right program for your goals.
			</p>
		</div>
		<a href="/join" class="btn-lime shrink-0">Claim Your Free Trial</a>
	</div>
</section>
