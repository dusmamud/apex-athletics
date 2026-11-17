<script lang="ts">
	import { Check, Clock, Dumbbell, Users } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
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
			const list = JSON.parse(localStorage.getItem('apex-trials') ?? '[]') as unknown[];
			list.push({ name, email, phone, plan: 'trial', goal: 'free-trial', at: new Date().toISOString() });
			localStorage.setItem('apex-trials', JSON.stringify(list));
		} catch {
			// localStorage unavailable — success still shows.
		}
		sent = true;
	}

	const included = ['Full gym access for 7 days', 'Two group classes of your choice', 'One-to-one assessment with a coach', 'Sauna and recovery suite access', 'No card details taken'];
	const steps = [
		{ n: '1', title: 'Claim your trial', text: 'Fill in the form — 30 seconds, no card.' },
		{ n: '2', title: 'Meet your coach', text: 'We email you within a day to book your assessment.' },
		{ n: '3', title: 'Train for 7 days', text: 'Full access. Decide at the end — zero pressure.' }
	];
</script>

<svelte:head>
	<title>7-Day Free Trial — APEX ATHLETICS</title>
	<meta name="description" content="Try APEX ATHLETICS free for 7 days: full gym access, two classes and a one-to-one coach assessment. No card required." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2">
		<div use:reveal>
			<p class="eyebrow">One offer. One action.</p>
			<h1 class="font-display mt-3 text-5xl leading-[0.95] font-semibold tracking-wide text-cream uppercase sm:text-6xl">
				7 Days <span class="text-lime">Free</span>
			</h1>
			<p class="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
				Train with purpose for a full week — the whole gym, real coaching, real classes.
				If it is not for you, walk away. No card, no catch.
			</p>
			<ul class="mt-7 space-y-3">
				{#each included as item (item)}
					<li class="flex items-start gap-2.5 text-sm text-cream/90"><Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} /><span>{item}</span></li>
				{/each}
			</ul>
			<div class="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
				<div><p class="font-display text-2xl font-semibold text-lime">4.9/5</p><p class="mt-0.5 text-xs text-muted">Google rating</p></div>
				<div><p class="font-display text-2xl font-semibold text-lime">2,400+</p><p class="mt-0.5 text-xs text-muted">Members</p></div>
				<div><p class="font-display text-2xl font-semibold text-lime">15 yrs</p><p class="mt-0.5 text-xs text-muted">Coaching</p></div>
			</div>
		</div>

		<div use:reveal>
			{#if sent}
				<div class="card p-6 sm:p-8" role="status">
					<p class="font-display text-2xl font-semibold tracking-wide text-lime uppercase">Your trial is booked, {name}</p>
					<p class="mt-3 text-sm leading-relaxed text-muted">We will email {email} within one working day to book your coach assessment. Your 7 days start on your first visit — not before.</p>
					<a href="/schedule" class="btn-lime mt-6">Browse Classes While You Wait</a>
				</div>
			{:else}
				<form class="card p-6 sm:p-8" onsubmit={submit} novalidate>
					<h2 class="font-display text-xl font-semibold tracking-wide text-cream uppercase">Claim your 7 days free</h2>
					{#if error}<p class="mt-4 rounded-md border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-300" role="alert">{error}</p>{/if}
					<div class="mt-5 space-y-4">
						<div><label for="ft-name" class="label">Your name</label><input id="ft-name" class="input" bind:value={name} placeholder="Jordan Lee" autocomplete="name" /></div>
						<div><label for="ft-email" class="label">Email</label><input id="ft-email" class="input" type="email" bind:value={email} placeholder="jordan@email.com" autocomplete="email" /></div>
						<div><label for="ft-phone" class="label">Phone <span class="normal-case text-muted">(optional)</span></label><input id="ft-phone" class="input" type="tel" bind:value={phone} placeholder="+1 (212) 555-0000" autocomplete="tel" /></div>
					</div>
					<button type="submit" class="btn-lime mt-6 w-full">Claim My Free Trial</button>
					<p class="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted"><Clock class="h-3.5 w-3.5 text-lime" /> No card required · No auto-renewal · Cancel anytime</p>
				</form>
			{/if}
		</div>
	</div>

	<div class="mx-auto mt-16 max-w-5xl">
		<h2 class="font-display text-center text-2xl font-semibold tracking-wide text-cream uppercase" use:reveal>How it works</h2>
		<div class="mt-8 grid gap-5 sm:grid-cols-3">
			{#each steps as s, i (s.n)}
				<div class="card min-w-0 p-6" use:reveal={{ delay: i * 90 }}>
					<p class="font-display flex h-10 w-10 items-center justify-center rounded-full bg-lime text-lg font-semibold text-ink">{s.n}</p>
					<h3 class="font-display mt-4 text-lg font-semibold tracking-wide text-cream uppercase">{s.title}</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
				</div>
			{/each}
		</div>
		<p class="mt-8 flex items-center justify-center gap-2 text-center text-sm text-muted" use:reveal>
			<Users class="h-4 w-4 shrink-0 text-lime" /> Prefer to look around first? <a href="/book-a-tour" class="font-semibold text-lime underline underline-offset-4">Book a free tour</a> or see the <a href="/facilities" class="font-semibold text-lime underline underline-offset-4">facilities</a>.
		</p>
		<p class="mt-2 flex items-center justify-center gap-2 text-center text-xs text-muted" use:reveal><Dumbbell class="h-4 w-4 shrink-0 text-lime" /> 7-day trial includes full access, two group classes and a coach assessment.</p>
	</div>
</section>
