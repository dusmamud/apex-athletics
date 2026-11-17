<script lang="ts">
	import { Check, Clock, Flame, Signal, User } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const program = $derived(data.program);
	const related = $derived(data.related);
</script>

<svelte:head>
	<title>{program.name} — APEX ATHLETICS</title>
	<meta name="description" content={program.description} />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<nav aria-label="Breadcrumb" class="text-sm text-muted">
		<a href="/" class="hover:text-lime">Home</a> <span aria-hidden="true">/</span>
		<a href="/programs" class="hover:text-lime">Programs</a> <span aria-hidden="true">/</span>
		<span class="text-cream">{program.name}</span>
	</nav>

	<div class="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
		<div class="min-w-0 overflow-hidden rounded-2xl border border-line">
			<img
				src={program.image}
				alt="{program.name} at APEX ATHLETICS"
				width="1200"
				height="800"
				class="aspect-[3/2] w-full object-cover"
			/>
		</div>
		<div class="min-w-0">
			<p class="eyebrow">Training program</p>
			<h1 class="section-title mt-2">{program.name}</h1>
			<p class="mt-2 text-lg font-medium text-lime">{program.tagline}</p>
			{#each program.long as para (para)}
				<p class="mt-4 leading-relaxed text-muted">{para}</p>
			{/each}
			<dl class="mt-6 grid grid-cols-2 gap-3">
				<div class="card flex items-center gap-3 !p-4">
					<Clock class="h-5 w-5 shrink-0 text-lime" />
					<div><dt class="text-xs text-muted uppercase">Session</dt><dd class="text-sm font-semibold text-cream">{program.duration}</dd></div>
				</div>
				<div class="card flex items-center gap-3 !p-4">
					<Signal class="h-5 w-5 shrink-0 text-lime" />
					<div><dt class="text-xs text-muted uppercase">Level</dt><dd class="text-sm font-semibold text-cream">{program.level}</dd></div>
				</div>
				<div class="card flex items-center gap-3 !p-4">
					<Flame class="h-5 w-5 shrink-0 text-lime" />
					<div><dt class="text-xs text-muted uppercase">Burn</dt><dd class="text-sm font-semibold text-cream">{program.calories}</dd></div>
				</div>
				<div class="card flex items-center gap-3 !p-4">
					<User class="h-5 w-5 shrink-0 text-lime" />
					<div><dt class="text-xs text-muted uppercase">Coach</dt><dd class="text-sm font-semibold text-cream">{program.coach}</dd></div>
				</div>
			</dl>
			<div class="mt-7 flex flex-wrap gap-3">
				<a href="/join" class="btn-lime">Start With a Free Trial</a>
				<a href="/schedule" class="btn-ghost">See Class Times</a>
			</div>
		</div>
	</div>

	<div class="mt-14 grid gap-8 lg:grid-cols-2">
		<div use:reveal>
			<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">What you get</h2>
			<ul class="mt-5 space-y-3">
				{#each program.benefits as benefit (benefit)}
					<li class="flex items-start gap-2.5 text-sm text-cream/90">
						<Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} />
						<span>{benefit}</span>
					</li>
				{/each}
			</ul>
		</div>
		<div use:reveal>
			<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">Weekly sessions</h2>
			<ul class="mt-5 space-y-2">
				{#each program.schedule as slot (slot)}
					<li class="card flex min-h-11 items-center px-4 py-2.5 text-sm text-cream/90">{slot}</li>
				{/each}
			</ul>
			<p class="mt-3 text-xs text-muted">Full timetable with all programs is on the Schedule page.</p>
		</div>
	</div>

	<div class="mt-14" use:reveal>
		<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">Other programs</h2>
		<div class="mt-6 grid gap-5 sm:grid-cols-3">
			{#each related as rel (rel.slug)}
				<a href="/programs/{rel.slug}" class="card group block min-w-0 overflow-hidden">
					<img src={rel.image} alt={rel.name} width="1200" height="800" loading="lazy" class="aspect-[3/2] w-full object-cover transition duration-500 group-hover:scale-105" />
					<div class="p-5">
						<h3 class="font-display text-lg font-semibold tracking-wide text-cream uppercase group-hover:text-lime">{rel.name}</h3>
						<p class="mt-1 text-sm text-muted">{rel.tagline}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
