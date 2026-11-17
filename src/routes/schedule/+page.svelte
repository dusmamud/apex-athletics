<script lang="ts">
	import { CalendarCheck, Clock, Flame, Users, X } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { days, programs, schedule, type ClassSlot } from '#lib/data/gym';

	const todayName = (() => {
		const d = new Date().getDay(); // 0 Sun .. 6 Sat
		return d === 0 ? 'Monday' : days[d - 1];
	})();

	let day = $state(todayName);
	let programFilter = $state('all');
	let booking = $state<ClassSlot | null>(null);
	let bookName = $state('');
	let bookEmail = $state('');
	let bookError = $state('');
	let booked = $state(false);

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

	function openBooking(slot: ClassSlot) {
		booking = slot;
		booked = false;
		bookError = '';
	}

	function submitBooking(e: SubmitEvent) {
		e.preventDefault();
		bookError = '';
		if (!booking) return;
		if (!bookName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookEmail)) {
			bookError = 'Please enter your name and a valid email.';
			return;
		}
		try {
			const list = JSON.parse(localStorage.getItem('apex-bookings') ?? '[]') as unknown[];
			list.push({ name: bookName, email: bookEmail, className: booking.name, day: booking.day, time: booking.time, at: new Date().toISOString() });
			localStorage.setItem('apex-bookings', JSON.stringify(list));
		} catch {
			// localStorage unavailable — success still shows.
		}
		booked = true;
	}
</script>

<svelte:head>
	<title>Class Schedule & Booking — APEX ATHLETICS</title>
	<meta
		name="description"
		content="Weekly class timetable at APEX ATHLETICS with one-click booking. Strength, HIIT and conditioning classes Monday to Saturday — filter by day and program."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">Plan your week</p>
		<h1 class="section-title mt-2">Class Schedule</h1>
		<p class="mt-4 leading-relaxed text-muted">
			Classes run Monday to Saturday, from 6:00 AM. Premium and Elite members book unlimited
			classes; Basic members get one class a week. Spots are limited — book yours below.
		</p>
	</div>

	<div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by day">
		{#each days as d (d)}
			<button
				type="button"
				aria-pressed={day === d}
				onclick={() => (day = d)}
				class="relative min-h-11 rounded-full border px-4 text-sm font-semibold transition {day === d
					? 'border-lime bg-lime text-ink'
					: 'border-line bg-panel text-cream hover:border-lime hover:text-lime'}"
			>
				{d.slice(0, 3)}
				{#if d === todayName}
					<span class="absolute -top-2 -right-1 rounded-full bg-lime px-1.5 text-[0.6rem] font-bold tracking-wide text-ink uppercase">Today</span>
				{/if}
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

	{#if day === todayName}
		<p class="mt-6 inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-4 py-2 text-sm font-semibold text-lime" use:reveal>
			<CalendarCheck class="h-4 w-4" /> Showing today's classes — {day}
		</p>
	{/if}

	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each filtered as slot, i (`${slot.day}-${slot.time}-${slot.name}`)}
			<article class="card min-w-0 p-5 {slot.day === todayName ? 'border-lime/60' : ''}" use:reveal={{ delay: (i % 3) * 90 }}>
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
					<Users class="h-4 w-4 text-lime" />
					<span class="font-semibold {slot.spots <= 8 ? 'text-red-300' : 'text-lime'}">{slot.spots} spots left</span>
					{#if slot.spots <= 8}<span class="text-xs text-red-300">· filling fast</span>{/if}
				</p>
				<div class="mt-4 flex gap-2">
					<button type="button" onclick={() => openBooking(slot)} class="btn-lime flex-1 !py-2.5 text-xs">Book This Class</button>
					<a href="/programs/{slot.program}" class="btn-ghost !py-2.5 text-xs" aria-label="View program for {slot.name}">Program</a>
				</div>
			</article>
		{:else}
			<p class="card col-span-full p-6 text-center text-muted">
				No classes match this filter on {day}. Try another day or program.
			</p>
		{/each}
	</div>

	<div class="mt-10 text-center" use:reveal>
		<a href="/free-trial" class="btn-lime">Book Your First Class Free</a>
	</div>
</section>

{#if booking}
	<div class="fixed inset-0 z-[70] flex items-end justify-center bg-ink/90 p-4 sm:items-center" role="dialog" aria-modal="true" aria-label="Book a class">
		<div class="card w-full max-w-md p-6 sm:p-8">
			<div class="flex items-start justify-between gap-3">
				<div>
					<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">Book a class</h2>
					<p class="mt-1 text-sm text-muted">{booking.name} · {booking.day} {booking.time} · Coach {booking.coach}</p>
				</div>
				<button type="button" onclick={() => (booking = null)} aria-label="Close booking form" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line text-cream transition hover:border-lime hover:text-lime">
					<X class="h-5 w-5" />
				</button>
			</div>
			{#if booked}
				<div role="status" class="mt-5">
					<p class="font-display text-xl font-semibold tracking-wide text-lime uppercase">You are booked in, {bookName}</p>
					<p class="mt-2 text-sm leading-relaxed text-muted">{booking.name} on {booking.day} at {booking.time}. We emailed {bookEmail} a confirmation — see you there.</p>
					<div class="mt-5 flex gap-2">
						<a href="/member-login" class="btn-lime flex-1">See My Bookings</a>
						<button type="button" onclick={() => (booking = null)} class="btn-ghost flex-1">Done</button>
					</div>
				</div>
			{:else}
				<form class="mt-5" onsubmit={submitBooking} novalidate>
					{#if bookError}<p class="mb-4 rounded-md border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-300" role="alert">{bookError}</p>{/if}
					<div class="space-y-4">
						<div><label for="bk-name" class="label">Your name</label><input id="bk-name" class="input" bind:value={bookName} placeholder="Jordan Lee" autocomplete="name" /></div>
						<div><label for="bk-email" class="label">Email</label><input id="bk-email" class="input" type="email" bind:value={bookEmail} placeholder="jordan@email.com" autocomplete="email" /></div>
					</div>
					<button type="submit" class="btn-lime mt-6 w-full">Confirm Booking</button>
					<p class="mt-3 text-center text-xs text-muted">Demo booking — saved on this device only. Free for trial members.</p>
				</form>
			{/if}
		</div>
	</div>
{/if}
