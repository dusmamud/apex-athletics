<script lang="ts">
	import { Briefcase, Check } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { openRoles } from '#lib/data/gym';

	let role = $state(openRoles[0].title);
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
			const list = JSON.parse(localStorage.getItem('apex-applications') ?? '[]') as unknown[];
			list.push({ role, name, email, at: new Date().toISOString() });
			localStorage.setItem('apex-applications', JSON.stringify(list));
		} catch {
			// localStorage unavailable — success still shows.
		}
		sent = true;
	}
</script>

<svelte:head>
	<title>Careers — APEX ATHLETICS</title>
	<meta name="description" content="Work at APEX ATHLETICS: open roles for strength coaches, HIIT coaches, front desk and nutrition coaches in New York." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">Join the team</p>
		<h1 class="section-title mt-2">Careers at APEX</h1>
		<p class="mt-4 leading-relaxed text-muted">
			We hire coaches who care about people, not just programming. Free membership, ongoing
			education and a team that trains together.
		</p>
	</div>

	<div class="mt-10 grid gap-5 lg:grid-cols-2">
		{#each openRoles as r, i (r.title)}
			<article class="card min-w-0 p-6" use:reveal={{ delay: (i % 2) * 90 }}>
				<div class="flex flex-wrap items-start justify-between gap-3">
					<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">{r.title}</h2>
					<span class="chip !text-lime">{r.type}</span>
				</div>
				<p class="mt-2 text-sm leading-relaxed text-muted">{r.description}</p>
				<ul class="mt-4 space-y-2">
					{#each r.requirements as req (req)}
						<li class="flex items-start gap-2.5 text-sm text-cream/90"><Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} /><span>{req}</span></li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-12 max-w-2xl" use:reveal>
		{#if sent}
			<div class="card p-6 sm:p-8" role="status">
				<p class="font-display text-2xl font-semibold tracking-wide text-lime uppercase">Application received</p>
				<p class="mt-3 text-sm leading-relaxed text-muted">Thanks, {name} — your application for {role} is saved. We will email {email} within a week if we would like to meet you.</p>
			</div>
		{:else}
			<form class="card p-6 sm:p-8" onsubmit={submit} novalidate>
				<h2 class="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-cream uppercase"><Briefcase class="h-5 w-5 text-lime" /> Apply now</h2>
				{#if error}<p class="mt-4 rounded-md border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-300" role="alert">{error}</p>{/if}
				<div class="mt-5 space-y-4">
					<div><label for="ca-role" class="label">Role</label><select id="ca-role" class="input" bind:value={role}>{#each openRoles as r (r.title)}<option>{r.title}</option>{/each}</select></div>
					<div><label for="ca-name" class="label">Your name</label><input id="ca-name" class="input" bind:value={name} placeholder="Jordan Lee" autocomplete="name" /></div>
					<div><label for="ca-email" class="label">Email</label><input id="ca-email" class="input" type="email" bind:value={email} placeholder="jordan@email.com" autocomplete="email" /></div>
				</div>
				<button type="submit" class="btn-lime mt-6 w-full">Submit Application</button>
				<p class="mt-3 text-center text-xs text-muted">Demo form — applications are saved on this device only.</p>
			</form>
		{/if}
	</div>
</section>
