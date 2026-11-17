<script lang="ts">
	import { Check, Trophy } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';

	let name = $state('');
	let email = $state('');
	let sent = $state(false);
	let error = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			error = 'Please enter your name and a valid email.';
			return;
		}
		try {
			const list = JSON.parse(localStorage.getItem('apex-challenges') ?? '[]') as unknown[];
			list.push({ name, email, challenge: '30-day', at: new Date().toISOString() });
			localStorage.setItem('apex-challenges', JSON.stringify(list));
		} catch {
			// localStorage unavailable — success still shows.
		}
		sent = true;
	}

	const weeks = [
		{ week: 'Week 1 — Foundations', text: 'Learn the big lifts, set your baseline numbers and build the habit: 3 sessions, every one coached.' },
		{ week: 'Week 2 — Build', text: 'Add load and volume. First HIIT session lands here — expect to be sore, expect to love it.' },
		{ week: 'Week 3 — Push', text: 'The hardest week. Conditioning test, nutrition check-in and a coach review of your numbers so far.' },
		{ week: 'Week 4 — Test', text: 'Re-test everything from Week 1. Most members add 10–20% to their lifts and finish with a photo and a plan for what is next.' }
	];
	const rules = ['Train at least 3 times a week', 'Log every session in the APEX app', 'Hit your daily protein target', 'One rest day is mandatory — recovery counts'];
</script>

<svelte:head>
	<title>30-Day Challenge — APEX ATHLETICS</title>
	<meta name="description" content="The APEX 30-day challenge: four weeks of coached training, testing and nutrition. Sign up free — members and trial members welcome." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<p class="eyebrow">Next intake: Jan 5, 2027</p>
		<h1 class="section-title mt-2">The 30-Day Challenge</h1>
		<p class="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
			Four weeks. Three sessions a week. One leaderboard. Test your strength and conditioning
			on day one, train with a coach, and re-test on day 30 — finishers get a prize and a plan.
		</p>
	</div>

	<div class="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
		{#each weeks as w, i (w.week)}
			<article class="card min-w-0 p-6" use:reveal={{ delay: (i % 2) * 90 }}>
				<h2 class="font-display text-lg font-semibold tracking-wide text-lime uppercase">{w.week}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-10 grid max-w-4xl gap-8 lg:grid-cols-2">
		<div class="card p-6" use:reveal>
			<h2 class="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-cream uppercase"><Trophy class="h-5 w-5 text-lime" /> The rules</h2>
			<ul class="mt-4 space-y-2.5">
				{#each rules as r (r)}
					<li class="flex items-start gap-2.5 text-sm text-cream/90"><Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} /><span>{r}</span></li>
				{/each}
			</ul>
			<p class="mt-4 text-xs leading-relaxed text-muted">Free for members. Trial members can join with a 7-day free trial. Prizes for top 3 on the leaderboard and every finisher.</p>
		</div>

		<div use:reveal>
			{#if sent}
				<div class="card p-6 sm:p-8" role="status">
					<p class="font-display text-2xl font-semibold tracking-wide text-lime uppercase">You are in, {name}</p>
					<p class="mt-3 text-sm leading-relaxed text-muted">Your 30-day challenge spot is saved. We will email {email} with your day-one testing time and what to bring.</p>
				</div>
			{:else}
				<form class="card p-6 sm:p-8" onsubmit={submit} novalidate>
					<h2 class="font-display text-xl font-semibold tracking-wide text-cream uppercase">Join the challenge</h2>
					{#if error}<p class="mt-4 rounded-md border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-300" role="alert">{error}</p>{/if}
					<div class="mt-5 space-y-4">
						<div><label for="ch-name" class="label">Your name</label><input id="ch-name" class="input" bind:value={name} placeholder="Jordan Lee" autocomplete="name" /></div>
						<div><label for="ch-email" class="label">Email</label><input id="ch-email" class="input" type="email" bind:value={email} placeholder="jordan@email.com" autocomplete="email" /></div>
					</div>
					<button type="submit" class="btn-lime mt-6 w-full">Save My Spot — Free</button>
					<p class="mt-3 text-center text-xs text-muted">Demo form — signups are saved on this device only.</p>
				</form>
			{/if}
		</div>
	</div>

	<div class="mt-10 text-center" use:reveal>
		<a href="/events" class="btn-ghost">See Upcoming Gym Events</a>
	</div>
</section>
