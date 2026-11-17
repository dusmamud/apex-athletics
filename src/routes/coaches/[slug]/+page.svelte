<script lang="ts">
	import { BadgeCheck } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const coach = $derived(data.coach);
	const coachPrograms = $derived(data.coachPrograms);
	const others = $derived(data.others);
</script>

<svelte:head>
	<title>{coach.name} — {coach.role} | APEX ATHLETICS</title>
	<meta name="description" content="{coach.name}, {coach.role} at APEX ATHLETICS. {coach.credentials}." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<nav aria-label="Breadcrumb" class="text-sm text-muted">
		<a href="/" class="hover:text-lime">Home</a> <span aria-hidden="true">/</span>
		<a href="/coaches" class="hover:text-lime">Coaches</a> <span aria-hidden="true">/</span>
		<span class="text-cream">{coach.name}</span>
	</nav>

	<div class="mt-6 grid gap-8 lg:grid-cols-5 lg:gap-12">
		<div class="min-w-0 overflow-hidden rounded-2xl border border-line lg:col-span-2">
			<img
				src={coach.image}
				alt="Coach {coach.name}"
				width="1000"
				height="1000"
				class="aspect-[4/3] w-full object-cover object-center lg:aspect-[3/3.4]"
			/>
		</div>
		<div class="min-w-0 lg:col-span-3">
			<p class="eyebrow">Coach</p>
			<h1 class="section-title mt-2">{coach.name}</h1>
			<p class="mt-2 text-lg font-medium text-lime">{coach.role}</p>
			<p class="mt-1 flex items-center gap-2 text-sm text-muted">
				<BadgeCheck class="h-4 w-4 text-lime" /> {coach.credentials} · {coach.experience}
			</p>
			{#each coach.bio as para (para)}
				<p class="mt-4 leading-relaxed text-muted">{para}</p>
			{/each}
			<div class="mt-6 flex flex-wrap gap-2">
				{#each coach.specialties as spec (spec)}
					<span class="chip">{spec}</span>
				{/each}
			</div>
			<div class="mt-7 flex flex-wrap gap-3">
				<a href="/join" class="btn-lime">Train With {coach.name.split(' ')[0]}</a>
				<a href="/schedule" class="btn-ghost">See Class Times</a>
			</div>
		</div>
	</div>

	{#if coachPrograms.length}
		<div class="mt-14" use:reveal>
			<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">
				Programs with {coach.name.split(' ')[0]}
			</h2>
			<div class="mt-6 grid gap-5 sm:grid-cols-2">
				{#each coachPrograms as program (program.slug)}
					<a href="/programs/{program.slug}" class="card group flex min-w-0 items-center gap-4 p-4">
						<img src={program.image} alt={program.name} width="400" height="267" loading="lazy" class="h-20 w-28 shrink-0 rounded-lg object-cover" />
						<span class="min-w-0">
							<span class="font-display block text-lg font-semibold tracking-wide text-cream uppercase group-hover:text-lime">{program.name}</span>
							<span class="block text-sm text-muted">{program.tagline}</span>
						</span>
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<div class="mt-14" use:reveal>
		<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">Other coaches</h2>
		<div class="mt-6 grid gap-5 sm:grid-cols-2">
			{#each others as other (other.slug)}
				<a href="/coaches/{other.slug}" class="card group flex min-w-0 items-center gap-4 p-4">
					<img src={other.image} alt="Coach {other.name}" width="400" height="400" loading="lazy" class="h-20 w-20 shrink-0 rounded-lg object-cover object-center" />
					<span class="min-w-0">
						<span class="font-display block text-lg font-semibold tracking-wide text-cream uppercase group-hover:text-lime">{other.name}</span>
						<span class="block text-sm text-muted">{other.role}</span>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
