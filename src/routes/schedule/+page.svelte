<script lang="ts">
	import { Clock, Flame, Users } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { days, programs, schedule } from '#lib/data/gym';

	let day = $state('Monday');
	let programFilter = $state('all');

	const filtered = $derived(
		schedule.filter(
			(s) => s.day === day && (programFilter === 'all' || s.program === programFilter)
		)
	);

	const intensityColor: Record<string, string> = {
		Low: 'text-lime',
		Moderate: 'text-gold',
		High: 'text-red-400'
	};
</script>

<svelte:head>
	<title>Class Schedule — APEX ATHLETICS</title>
	<meta
		name="description"
		content="Weekly class timetable at APEX ATHLETICS. Strength, HIIT and conditioning classes Monday to Saturday — filter by day and program."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">Plan your week</p>
		<h1 class="section-title mt-2">Class Schedule</h1>
		<p class="mt-4 leading-relaxed text-muted">
			Classes run Monday to Saturday, from 6:00 AM. Premium and Elite members book unlimited
			classes; Basic members get one class a week.
		</p>
	</div>

	<div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by day">
		{#each days as d (d)}
			<button
				type="button"
				aria-pressed={day === d}
				onclick={() => (day = d)}
				class="min-h-11 rounded-full border px-4 text-sm font-semibold transition {day === d
					? 'border-lime bg-lime text-ink'
					: 'border-line bg-panel text-cream hover:border-lime hover:text-lime'}"
			>
				{d.slice(0, 3)}
			</button>
		{/each}
	</div>

	<div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by program">
		<button
			type="button"
			aria-pressed={programFilter === 'all'}
			onclick={() => (programFilter = 'all')}
			class="chip !min-h-11 cursor-pointer transition {programFilter === 'all' ? '!border-lime !text-lime' : ''}"
		>
			All programs
		</button>
		{#each programs as program (program.slug)}
			<button
				type="button"
				aria-pressed={programFilter === program.slug}
				onclick={() => (programFilter = program.slug)}
				class="chip !min-h-11 cursor-pointer transition {programFilter === program.slug
					? '!border-lime !text-lime'
					: ''}"
			>
				{program.name}
			</button>
		{/each}
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each filtered as slot, i (`${slot.day}-${slot.time}-${slot.name}`)}
			<article class="card min-w-0 p-5" use:reveal={{ delay: (i % 3) * 60 }}>
				<div class="flex items-start justify-between gap-3">
					<h2 class="font-display text-xl font-semibold tracking-wide text-cream uppercase">{slot.name}</h2>
					<span class="chip shrink-0">{slot.day.slice(0, 3)}</span>
				</div>
				<p class="mt-2 flex items-center gap-2 text-sm text-muted">
					<Clock class="h-4 w-4 text-lime" /> {slot.time} · Coach {slot.coach}
				</p>
				<p class="mt-1 flex items-center gap-2 text-sm text-muted">
					<Flame class="h-4 w-4 text-lime" /> Intensity:
					<span class="font-semibold {intensityColor[slot.intensity]}">{slot.intensity}</span>
				</p>
				<p class="mt-1 flex items-center gap-2 text-sm text-muted">
					<Users class="h-4 w-4 text-lime" /> {slot.spots} spots per class
				</p>
				<a href="/programs/{slot.program}" class="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-lime uppercase hover:underline">
					View program →
				</a>
			</article>
		{:else}
			<p class="card col-span-full p-6 text-center text-muted">
				No classes match this filter on {day}. Try another day or program.
			</p>
		{/each}
	</div>

	<div class="mt-10 text-center" use:reveal>
		<a href="/join" class="btn-lime">Book Your First Class Free</a>
	</div>
</section>
