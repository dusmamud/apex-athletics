<script lang="ts">
	import { CheckCircle2 } from '@lucide/svelte';
	import { page } from '$app/state';
	import { reveal } from '#lib/reveal';
	import { plans } from '#lib/data/gym';

	// `page.url.searchParams` is unavailable during prerender, so the ?plan=
	// preselection is applied on mount, in the browser only.
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let plan = $state('premium');

	$effect(() => {
		const preselected = page.url.searchParams.get('plan') ?? 'premium';
		if (plans.some((p) => p.name.toLowerCase() === preselected)) plan = preselected;
	});
	let goal = $state('Build strength');
	let errors: Record<string, string> = $state({});
	let done = $state(false);

	function submit(event: SubmitEvent) {
		event.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your full name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
		if (!/^\+?[0-9\s()-]{7,}$/.test(phone)) errors.phone = 'Please enter a valid phone number.';
		if (Object.keys(errors).length) return;
		// Demo only: no backend. The trial request is stored locally so it is not lost.
		try {
			const list = JSON.parse(localStorage.getItem('apex-trials') ?? '[]') as unknown[];
			list.push({ name, email, phone, plan, goal, at: new Date().toISOString() });
			localStorage.setItem('apex-trials', JSON.stringify(list));
		} catch {
			// localStorage unavailable — the success message still shows.
		}
		done = true;
	}
</script>

<svelte:head>
	<title>Join the Gym — 7-Day Free Trial | APEX ATHLETICS</title>
	<meta
		name="description"
		content="Claim your 7-day free trial at APEX ATHLETICS. Full gym access, two group classes and a one-to-one coach assessment. No card required."
	/>
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="text-center" use:reveal>
		<p class="eyebrow">7 days free · No card required</p>
		<h1 class="section-title mt-2">Join the Gym</h1>
		<p class="mx-auto mt-3 max-w-xl text-muted">
			Full gym access, two group classes and a one-to-one assessment with a coach. Pick a plan —
			you can change it any time.
		</p>
	</div>

	{#if done}
		<div class="card mt-10 p-8 text-center" role="status" use:reveal>
			<CheckCircle2 class="mx-auto h-12 w-12 text-lime" />
			<h2 class="font-display mt-4 text-3xl font-semibold tracking-wide text-cream uppercase">
				You are in, {name.split(' ')[0]}!
			</h2>
			<p class="mx-auto mt-3 max-w-md text-muted">
				Your 7-day free trial is booked on the {plan} plan. A coach will email {email} within one
				business day to schedule your first session.
			</p>
			<p class="mt-2 text-xs text-muted">Demo form — your request was saved in this browser only.</p>
			<div class="mt-6 flex flex-wrap justify-center gap-3">
				<a href="/schedule" class="btn-lime">See Class Times</a>
				<a href="/" class="btn-ghost">Back to Home</a>
			</div>
		</div>
	{:else}
		<form class="card mt-10 p-6 sm:p-8" onsubmit={submit} novalidate use:reveal>
			<div class="grid gap-5 sm:grid-cols-2">
				<div class="min-w-0">
					<label for="name" class="label">Full name</label>
					<input id="name" type="text" class="input" placeholder="Jane Cooper" bind:value={name} autocomplete="name" />
					{#if errors.name}<p class="mt-1 text-xs text-red-400">{errors.name}</p>{/if}
				</div>
				<div class="min-w-0">
					<label for="email" class="label">Email</label>
					<input id="email" type="email" class="input" placeholder="jane@example.com" bind:value={email} autocomplete="email" />
					{#if errors.email}<p class="mt-1 text-xs text-red-400">{errors.email}</p>{/if}
				</div>
			</div>
			<div class="mt-5 grid gap-5 sm:grid-cols-2">
				<div class="min-w-0">
					<label for="phone" class="label">Phone</label>
					<input id="phone" type="tel" class="input" placeholder="+1 (212) 555-0100" bind:value={phone} autocomplete="tel" />
					{#if errors.phone}<p class="mt-1 text-xs text-red-400">{errors.phone}</p>{/if}
				</div>
				<div class="min-w-0">
					<label for="plan" class="label">Plan</label>
					<select id="plan" class="input" bind:value={plan}>
						{#each plans as p (p.name)}
							<option value={p.name.toLowerCase()}>{p.name} — ${p.monthly}/month</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="mt-5">
				<label for="goal" class="label">Your main goal</label>
				<select id="goal" class="input" bind:value={goal}>
					<option>Build strength</option>
					<option>Lose weight</option>
					<option>Improve conditioning</option>
					<option>Train for a sport</option>
					<option>Just get moving again</option>
				</select>
			</div>
			<button type="submit" class="btn-lime mt-7 w-full">Claim My Free Trial</button>
			<p class="mt-3 text-center text-xs leading-relaxed text-muted">
				By joining you agree to our <a href="/terms" class="text-lime underline underline-offset-2">Terms</a>
				and <a href="/privacy-policy" class="text-lime underline underline-offset-2">Privacy Policy</a>.
				Demo form — nothing is sent to a server yet.
			</p>
		</form>
	{/if}
</section>
