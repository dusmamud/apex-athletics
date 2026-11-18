<script lang="ts">
	import { ArrowRight, Target } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { classGoals, programs } from '#lib/data/gym';
	import { imgSrcSet } from '#lib/img';

	const programName = (slug: string) => programs.find((p) => p.slug === slug)?.name ?? slug;
</script>

<svelte:head>
	<title>Classes by Goal — APEX ATHLETICS</title>
	<meta name="description" content="Find the right class for your goal: build strength, lose fat, move better or perform in sport. Every class is coached, every level welcome." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">Start with your goal</p>
		<h1 class="section-title mt-2">Classes by Goal</h1>
		<p class="mt-4 leading-relaxed text-muted">
			Not sure where to start? Pick the outcome you want and we will point you at the right
			classes. Every class is coached in small groups and scales to your level.
		</p>
	</div>

	<div class="mt-10 grid gap-5 sm:grid-cols-2">
		{#each classGoals as goal, i (goal.goal)}
			<article class="card min-w-0 overflow-hidden" use:reveal={{ delay: (i % 2) * 90 }}>
				<div class="overflow-hidden">
					<img
						src={goal.image}
						srcset={imgSrcSet(goal.image, [480, 800, 1200])}
						sizes="(max-width: 640px) 100vw, 50vw"
						alt={goal.goal}
						width="1200"
						height="800"
						loading="lazy"
						class="aspect-[16/9] w-full object-cover transition duration-300 hover:scale-105"
					/>
				</div>
				<div class="p-6">
					<h2 class="font-display flex items-center gap-2 text-2xl font-semibold tracking-wide text-cream uppercase">
						<Target class="h-5 w-5 text-lime" /> {goal.goal}
					</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{goal.blurb}</p>
					<p class="mt-4 text-xs font-semibold tracking-wider text-muted uppercase">Best programs</p>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each goal.programs as slug (slug)}
							<a href="/programs/{slug}" class="chip transition hover:border-lime hover:text-lime">{programName(slug)}</a>
						{/each}
					</div>
					<a href="/schedule" class="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-lime uppercase hover:underline">
						See the timetable <ArrowRight class="h-4 w-4" />
					</a>
				</div>
			</article>
		{/each}
	</div>

	<div class="card mt-10 p-6 text-center sm:p-8" use:reveal>
		<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">Still not sure?</h2>
		<p class="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
			Book a free 7-day trial and a coach will assess your movement, talk through your goals
			and recommend the classes that fit you — no card required.
		</p>
		<a href="/free-trial" class="btn-lime mt-5">Claim Your Free Trial</a>
	</div>
</section>
