<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';

	let name = $state('');
	let email = $state('');
	let date = $state('');
	let time = $state('10:00 AM');
	let sent = $state(false);
	let error = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !date) {
			error = 'Please enter your name, a valid email and pick a date.';
			return;
		}
		try {
			const list = JSON.parse(localStorage.getItem('apex-tours') ?? '[]') as unknown[];
			list.push({ name, email, date, time, at: new Date().toISOString() });
			localStorage.setItem('apex-tours', JSON.stringify(list));
		} catch {
			// localStorage unavailable — success still shows.
		}
		sent = true;
	}
</script>

<svelte:head>
	<title>Book a Free Tour — APEX ATHLETICS</title>
	<meta name="description" content="Book a free 30-minute tour of APEX ATHLETICS: see the strength floor, cardio zone, turf and recovery suite with a coach." />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="text-center" use:reveal>
		<p class="eyebrow">Look around first</p>
		<h1 class="section-title mt-2">Book a Free Tour</h1>
		<p class="mx-auto mt-3 max-w-xl text-muted">
			30 minutes with a coach: the strength floor, cardio zone, functional turf and recovery
			suite — plus honest answers about membership. No pressure to join.
		</p>
	</div>

	{#if sent}
		<div class="card mx-auto mt-10 max-w-xl p-6 sm:p-8" role="status" use:reveal>
			<p class="font-display text-2xl font-semibold tracking-wide text-lime uppercase">Tour booked, {name}</p>
			<p class="mt-3 text-sm leading-relaxed text-muted">See you on {date} at {time}. We will email {email} a confirmation and what to bring — just yourself and training shoes.</p>
			<a href="/free-trial" class="btn-lime mt-6">Or Start Your Free Trial Instead</a>
		</div>
	{:else}
		<form class="card mx-auto mt-10 max-w-xl p-6 sm:p-8" onsubmit={submit} novalidate use:reveal>
			{#if error}<p class="mb-4 rounded-md border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-300" role="alert">{error}</p>{/if}
			<div class="space-y-4">
				<div><label for="bt-name" class="label">Your name</label><input id="bt-name" class="input" bind:value={name} placeholder="Jordan Lee" autocomplete="name" /></div>
				<div><label for="bt-email" class="label">Email</label><input id="bt-email" class="input" type="email" bind:value={email} placeholder="jordan@email.com" autocomplete="email" /></div>
				<div class="grid gap-4 sm:grid-cols-2">
					<div><label for="bt-date" class="label">Date</label><input id="bt-date" class="input" type="date" bind:value={date} /></div>
					<div><label for="bt-time" class="label">Time</label><select id="bt-time" class="input" bind:value={time}><option>8:00 AM</option><option>10:00 AM</option><option>12:00 PM</option><option>4:00 PM</option><option>6:00 PM</option></select></div>
				</div>
			</div>
			<button type="submit" class="btn-lime mt-6 w-full">Book My Free Tour</button>
			<ul class="mt-5 space-y-2">
				{#each ['30 minutes, with a coach', 'See all four training zones', 'Try the equipment if you like'] as item (item)}
					<li class="flex items-start gap-2.5 text-sm text-cream/90"><Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} /><span>{item}</span></li>
				{/each}
			</ul>
			<p class="mt-4 text-center text-xs text-muted">Demo form — bookings are saved on this device only.</p>
		</form>
	{/if}
</section>
