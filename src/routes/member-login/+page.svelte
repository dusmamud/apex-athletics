<script lang="ts">
	import { CalendarDays, LogOut, User } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';

	interface Booking { name: string; email: string; className: string; day: string; time: string; at: string; }

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loggedIn = $state(false);
	let bookings = $state<Booking[]>([]);

	function login(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (email.trim().toLowerCase() === 'demo@apexathletics.com' && password === 'demo1234') {
			loggedIn = true;
			try {
				bookings = JSON.parse(localStorage.getItem('apex-bookings') ?? '[]') as Booking[];
			} catch {
				bookings = [];
			}
		} else {
			error = 'Those details do not match. Try the demo account: demo@apexathletics.com / demo1234.';
		}
	}

	function logout() {
		loggedIn = false;
		email = '';
		password = '';
		bookings = [];
	}

	function cancelBooking(index: number) {
		bookings = bookings.filter((_, i) => i !== index);
		try {
			localStorage.setItem('apex-bookings', JSON.stringify(bookings));
		} catch {
			// ignore
		}
	}
</script>

<svelte:head>
	<title>Member Login — APEX ATHLETICS</title>
	<meta name="description" content="Member login for APEX ATHLETICS. Demo account: demo@apexathletics.com / demo1234." />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	{#if !loggedIn}
		<div class="text-center" use:reveal>
			<p class="eyebrow">Members</p>
			<h1 class="section-title mt-2">Member Login</h1>
			<p class="mt-3 text-muted">See your bookings, plan and membership status.</p>
		</div>
		<form class="card mx-auto mt-10 max-w-md p-6 sm:p-8" onsubmit={login} novalidate use:reveal>
			{#if error}<p class="mb-4 rounded-md border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-300" role="alert">{error}</p>{/if}
			<div class="space-y-4">
				<div><label for="ml-email" class="label">Email</label><input id="ml-email" class="input" type="email" bind:value={email} placeholder="you@email.com" autocomplete="email" /></div>
				<div><label for="ml-pass" class="label">Password</label><input id="ml-pass" class="input" type="password" bind:value={password} placeholder="Your password" autocomplete="current-password" /></div>
			</div>
			<button type="submit" class="btn-lime mt-6 w-full">Log In</button>
			<p class="mt-4 rounded-md bg-panel-2 p-3 text-center text-xs leading-relaxed text-muted">
				Demo account — email <strong class="text-cream">demo@apexathletics.com</strong>, password <strong class="text-cream">demo1234</strong>
			</p>
			<p class="mt-3 text-center text-sm text-muted">New here? <a href="/join" class="font-semibold text-lime underline underline-offset-4">Join the gym</a></p>
		</form>
	{:else}
		<div use:reveal>
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div>
					<p class="eyebrow">Welcome back</p>
					<h1 class="section-title mt-2">Your Dashboard</h1>
					<p class="mt-2 flex items-center gap-2 text-sm text-muted"><User class="h-4 w-4 text-lime" /> Demo Member · demo@apexathletics.com</p>
				</div>
				<button type="button" onclick={logout} class="btn-ghost !min-h-11"><LogOut class="h-4 w-4" /> Log Out</button>
			</div>

			<div class="mt-8 grid gap-4 sm:grid-cols-3">
				<div class="card p-5"><p class="text-xs font-bold tracking-wider text-muted uppercase">Membership</p><p class="font-display mt-2 text-2xl font-semibold text-lime">Premium</p><p class="mt-1 text-xs text-muted">Renews Dec 1, 2026 · $180/mo</p></div>
				<div class="card p-5"><p class="text-xs font-bold tracking-wider text-muted uppercase">Classes booked</p><p class="font-display mt-2 text-2xl font-semibold text-lime">{bookings.length}</p><p class="mt-1 text-xs text-muted">Book more from the schedule</p></div>
				<div class="card p-5"><p class="text-xs font-bold tracking-wider text-muted uppercase">PT sessions left</p><p class="font-display mt-2 text-2xl font-semibold text-lime">2</p><p class="mt-1 text-xs text-muted">This month, with Maria</p></div>
			</div>

			<div class="card mt-6 p-6" use:reveal>
				<h2 class="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-cream uppercase"><CalendarDays class="h-5 w-5 text-lime" /> Your upcoming classes</h2>
				{#if bookings.length === 0}
					<p class="mt-3 text-sm leading-relaxed text-muted">No classes booked yet. Book one from the <a href="/schedule" class="font-semibold text-lime underline underline-offset-4">class schedule</a> and it will show up here.</p>
				{:else}
					<ul class="mt-4 space-y-3">
						{#each bookings as b, i (b.at + i)}
							<li class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 p-4">
								<div class="min-w-0">
									<p class="text-sm font-semibold text-cream">{b.className}</p>
									<p class="mt-0.5 text-xs text-muted">{b.day} · {b.time}</p>
								</div>
								<button type="button" onclick={() => cancelBooking(i)} class="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-xs font-bold tracking-wide text-cream uppercase transition hover:border-red-400 hover:text-red-300">Cancel</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<div class="mt-6 flex flex-wrap gap-3" use:reveal>
				<a href="/schedule" class="btn-lime">Book a Class</a>
				<a href="/membership" class="btn-ghost">Manage Membership</a>
			</div>
			<p class="mt-6 text-xs leading-relaxed text-muted">Demo dashboard — bookings are stored in this browser only. Freeze or cancel anytime from Membership, with 30 days notice.</p>
		</div>
	{/if}
</section>
