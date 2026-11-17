<script lang="ts">
	import { CalendarDays, Clock } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { gymEvents } from '#lib/data/gym';
</script>

<svelte:head>
	<title>Events — APEX ATHLETICS</title>
	<meta name="description" content="Upcoming events at APEX ATHLETICS: strength testing days, bring-a-friend Saturdays, challenges and open days." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">More than a gym</p>
		<h1 class="section-title mt-2">Upcoming Events</h1>
		<p class="mt-4 leading-relaxed text-muted">
			Testing days, open days, challenges and community Saturdays. Members get first access —
			most events are free for members.
		</p>
	</div>

	<div class="mt-10 grid gap-5 md:grid-cols-2">
		{#each gymEvents as ev, i (ev.title)}
			<article class="card min-w-0 p-6" use:reveal={{ delay: (i % 2) * 90 }}>
				<p class="flex items-center gap-2 text-xs font-bold tracking-wider text-lime uppercase"><CalendarDays class="h-4 w-4" /> {ev.date}</p>
				<h2 class="font-display mt-2 text-2xl font-semibold tracking-wide text-cream uppercase">{ev.title}</h2>
				<p class="mt-1 flex items-center gap-2 text-sm text-muted"><Clock class="h-4 w-4 text-lime" /> {ev.time}</p>
				<p class="mt-3 text-sm leading-relaxed text-muted">{ev.description}</p>
			</article>
		{/each}
	</div>

	<div class="card mt-10 p-6 text-center sm:p-8" use:reveal>
		<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">Want to join an event?</h2>
		<p class="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">Members can book at the front desk or in the app. Not a member yet? A 7-day free trial covers any event in your trial week.</p>
		<a href="/free-trial" class="btn-lime mt-5">Start Your Free Trial</a>
		<a href="/challenges" class="btn-ghost ml-3">Join the 30-Day Challenge</a>
	</div>
</section>
