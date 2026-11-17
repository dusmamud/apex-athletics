<script lang="ts">
	import { Building2, Check, Users } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';

	let company = $state('');
	let name = $state('');
	let email = $state('');
	let teamSize = $state('11–25');
	let sent = $state(false);
	let error = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (!company.trim() || !name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			error = 'Please fill in your company, your name and a valid work email.';
			return;
		}
		try {
			const list = JSON.parse(localStorage.getItem('apex-corporate') ?? '[]') as unknown[];
			list.push({ company, name, email, teamSize, at: new Date().toISOString() });
			localStorage.setItem('apex-corporate', JSON.stringify(list));
		} catch {
			// localStorage unavailable — success still shows.
		}
		sent = true;
	}

	const tiers = [
		{ name: 'Team', price: '$89', per: 'per employee / month', features: ['Gym access for your team', '2 group classes a week', 'Monthly team challenge', 'Quarterly wellness report'] },
		{ name: 'Business', price: '$119', per: 'per employee / month', features: ['Everything in Team', 'Unlimited classes', '1 personal training session / month', 'Nutrition workshop each quarter', 'Dedicated account manager'], popular: true },
		{ name: 'Enterprise', price: 'Custom', per: 'tailored to your company', features: ['Everything in Business', 'On-site sessions at your office', 'Executive coaching', 'Health screenings', 'Custom reporting & invoicing'] }
	];
</script>

<svelte:head>
	<title>Corporate Wellness — APEX ATHLETICS</title>
	<meta name="description" content="Corporate gym memberships for New York teams: group training, wellness challenges and reporting. Enquire for a team quote." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">For teams</p>
		<h1 class="section-title mt-2">Corporate Wellness</h1>
		<p class="mt-4 leading-relaxed text-muted">
			Healthier teams do better work. Give your people a gym they will actually use — with
			coached classes, team challenges and one simple invoice.
		</p>
	</div>

	<div class="mt-10 grid gap-6 lg:grid-cols-3">
		{#each tiers as tier, i (tier.name)}
			<article class="card flex min-w-0 flex-col p-6 sm:p-7 {tier.popular ? 'relative border-lime shadow-[0_0_0_1px_#b7e332,0_16px_40px_rgba(183,227,50,0.08)]' : ''}" use:reveal={{ delay: i * 90 }}>
				{#if tier.popular}
					<span class="absolute -top-3.5 left-1/2 flex min-h-7 -translate-x-1/2 items-center gap-1 rounded-full bg-lime px-3 text-[0.65rem] font-bold tracking-wider whitespace-nowrap text-ink uppercase"><Users class="h-3.5 w-3.5" /> Most Popular</span>
				{/if}
				<h2 class="font-display text-xl font-semibold tracking-wide text-cream uppercase">{tier.name}</h2>
				<p class="mt-4 flex items-baseline gap-1"><span class="font-display text-5xl font-semibold text-cream">{tier.price}</span></p>
				<p class="mt-1 text-xs text-muted">{tier.per}</p>
				<ul class="mt-6 flex-1 space-y-3">
					{#each tier.features as f (f)}
						<li class="flex items-start gap-2.5 text-sm text-cream/90"><Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} /><span>{f}</span></li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-2">
		<div use:reveal>
			<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">Why teams choose APEX</h2>
			<ul class="mt-4 space-y-3 text-sm leading-relaxed text-muted">
				<li class="flex items-start gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} /><span><strong class="text-cream">Real usage, not unused memberships:</strong> quarterly reports show how often your team actually trains.</span></li>
				<li class="flex items-start gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} /><span><strong class="text-cream">Team challenges:</strong> monthly step, strength and HIIT challenges that get the whole office talking.</span></li>
				<li class="flex items-start gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} /><span><strong class="text-cream">Flexible start:</strong> add or remove employees monthly — you only pay for active members.</span></li>
			</ul>
		</div>

		<div use:reveal>
			{#if sent}
				<div class="card p-6 sm:p-8" role="status">
					<p class="font-display text-2xl font-semibold tracking-wide text-lime uppercase">Enquiry received</p>
					<p class="mt-3 text-sm leading-relaxed text-muted">Thanks, {name}. We will email {email} within one working day with a quote for {company} and a free team taster session.</p>
				</div>
			{:else}
				<form class="card p-6 sm:p-8" onsubmit={submit} novalidate>
					<h2 class="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-cream uppercase"><Building2 class="h-5 w-5 text-lime" /> Get a team quote</h2>
					{#if error}<p class="mt-4 rounded-md border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-300" role="alert">{error}</p>{/if}
					<div class="mt-5 space-y-4">
						<div><label for="cw-company" class="label">Company</label><input id="cw-company" class="input" bind:value={company} placeholder="Acme Inc." autocomplete="organization" /></div>
						<div><label for="cw-name" class="label">Your name</label><input id="cw-name" class="input" bind:value={name} placeholder="Jordan Lee" autocomplete="name" /></div>
						<div><label for="cw-email" class="label">Work email</label><input id="cw-email" class="input" type="email" bind:value={email} placeholder="jordan@acme.com" autocomplete="email" /></div>
						<div><label for="cw-size" class="label">Team size</label><select id="cw-size" class="input" bind:value={teamSize}><option>1–10</option><option>11–25</option><option>26–50</option><option>51–100</option><option>100+</option></select></div>
					</div>
					<button type="submit" class="btn-lime mt-6 w-full">Request Quote</button>
					<p class="mt-3 text-center text-xs text-muted">Demo form — enquiries are saved on this device only.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
