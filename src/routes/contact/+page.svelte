<script lang="ts">
	import { CheckCircle2, Mail, MapPin, Phone } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';

	let name = $state('');
	let email = $state('');
	let subject = $state('General question');
	let message = $state('');
	let errors: Record<string, string> = $state({});
	let sent = $state(false);

	function submit(event: SubmitEvent) {
		event.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
		if (message.trim().length < 10) errors.message = 'Please tell us a little more (at least 10 characters).';
		if (Object.keys(errors).length) return;
		// Demo only: no backend. The enquiry is stored locally so it is not lost.
		try {
			const list = JSON.parse(localStorage.getItem('apex-contact') ?? '[]') as unknown[];
			list.push({ name, email, subject, message, at: new Date().toISOString() });
			localStorage.setItem('apex-contact', JSON.stringify(list));
		} catch {
			// localStorage unavailable — the success message still shows.
		}
		sent = true;
	}
</script>

<svelte:head>
	<title>Contact Us — APEX ATHLETICS</title>
	<meta name="description" content="Contact APEX ATHLETICS — visit the gym, call, email or send a message. We reply within one business day." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="min-w-0 lg:col-span-2" use:reveal>
			<p class="eyebrow">Get in touch</p>
			<h1 class="section-title mt-2">Contact Us</h1>
			<p class="mt-4 leading-relaxed text-muted">
				Questions about membership, programs or your first session? Talk to a real person — we
				reply within one business day.
			</p>
			<ul class="mt-8 space-y-4 text-sm">
				<!-- Demo contact details — replace with the real gym address, phone and email before launch. -->
				<li class="flex items-start gap-3">
					<MapPin class="mt-0.5 h-5 w-5 shrink-0 text-lime" />
					<span class="text-cream/90">48 Ironworks Avenue, Downtown, New York, NY 10001</span>
				</li>
				<li class="flex items-center gap-3">
					<Phone class="h-5 w-5 shrink-0 text-lime" />
					<a href="tel:+12125550148" class="text-cream/90 hover:text-lime">+1 (212) 555-0148</a>
				</li>
				<li class="flex items-center gap-3">
					<Mail class="h-5 w-5 shrink-0 text-lime" />
					<a href="mailto:train@apexathletics.com" class="text-cream/90 hover:text-lime">train@apexathletics.com</a>
				</li>
			</ul>
			<div class="card mt-8 p-5">
				<h2 class="font-display text-lg font-semibold tracking-wide text-cream uppercase">Opening hours</h2>
				<ul class="mt-3 space-y-1.5 text-sm text-muted">
					<li class="flex justify-between gap-4"><span>Monday – Saturday</span><span class="text-cream">5:00 AM – 10:00 PM</span></li>
					<li class="flex justify-between gap-4"><span>Sunday</span><span class="text-cream">7:00 AM – 8:00 PM</span></li>
				</ul>
			</div>
		</div>

		<div class="min-w-0 lg:col-span-3" use:reveal>
			{#if sent}
				<div class="card p-8 text-center" role="status">
					<CheckCircle2 class="mx-auto h-12 w-12 text-lime" />
					<h2 class="font-display mt-4 text-3xl font-semibold tracking-wide text-cream uppercase">Message received</h2>
					<p class="mx-auto mt-3 max-w-md text-muted">
						Thanks, {name.split(' ')[0]}. We will get back to you at {email} within one business day.
					</p>
					<p class="mt-2 text-xs text-muted">Demo form — your message was saved in this browser only.</p>
					<a href="/" class="btn-lime mt-6">Back to Home</a>
				</div>
			{:else}
				<form class="card p-6 sm:p-8" onsubmit={submit} novalidate>
					<div class="grid gap-5 sm:grid-cols-2">
						<div class="min-w-0">
							<label for="name" class="label">Your name</label>
							<input id="name" type="text" class="input" placeholder="Jane Cooper" bind:value={name} autocomplete="name" />
							{#if errors.name}<p class="mt-1 text-xs text-red-400">{errors.name}</p>{/if}
						</div>
						<div class="min-w-0">
							<label for="email" class="label">Email</label>
							<input id="email" type="email" class="input" placeholder="jane@example.com" bind:value={email} autocomplete="email" />
							{#if errors.email}<p class="mt-1 text-xs text-red-400">{errors.email}</p>{/if}
						</div>
					</div>
					<div class="mt-5">
						<label for="subject" class="label">Subject</label>
						<select id="subject" class="input" bind:value={subject}>
							<option>General question</option>
							<option>Membership</option>
							<option>Personal training</option>
							<option>Class schedule</option>
							<option>Feedback</option>
						</select>
					</div>
					<div class="mt-5">
						<label for="message" class="label">Message</label>
						<textarea id="message" rows="5" class="input resize-y" placeholder="How can we help?" bind:value={message}></textarea>
						{#if errors.message}<p class="mt-1 text-xs text-red-400">{errors.message}</p>{/if}
					</div>
					<button type="submit" class="btn-lime mt-6 w-full">Send Message</button>
					<p class="mt-3 text-center text-xs text-muted">Demo form — nothing is sent to a server yet.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
