<script lang="ts">
	import { Bus, Car, Clock, Mail, MapPin, Phone, TrainFront } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';

	const hours = [
		{ days: 'Monday – Friday', time: '5:00 AM – 10:00 PM' },
		{ days: 'Saturday', time: '5:00 AM – 10:00 PM' },
		{ days: 'Sunday', time: '7:00 AM – 8:00 PM' }
	];
</script>

<svelte:head>
	<title>Location & Hours — APEX ATHLETICS</title>
	<meta name="description" content="APEX ATHLETICS at 48 Ironworks Avenue, New York. Open Mon–Sat 5 AM–10 PM, Sun 7 AM–8 PM. Free parking, step-free access, near the subway." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">Find us</p>
		<h1 class="section-title mt-2">Location & Hours</h1>
		<p class="mt-4 leading-relaxed text-muted">
			In the heart of downtown New York — two minutes from the subway, with free parking on site.
		</p>
	</div>

	<div class="mt-10 grid gap-6 lg:grid-cols-2">
		<div class="min-w-0">
			<div class="overflow-hidden rounded-xl border border-line" use:reveal>
				<iframe
					title="Map — APEX ATHLETICS, 48 Ironworks Avenue, New York"
					src="https://www.google.com/maps?q=48%20Ironworks%20Avenue%2C%20New%20York%2C%20NY%2010001&output=embed"
					class="h-72 w-full border-0 sm:h-96"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
			<p class="mt-3 text-sm text-muted">
				Map not loading? <a href="https://www.google.com/maps/search/?api=1&query=48+Ironworks+Avenue+New+York+NY+10001" target="_blank" rel="noreferrer" class="font-semibold text-lime underline underline-offset-4">Open directions in Google Maps</a>
			</p>

			<div class="card mt-6 p-6" use:reveal>
				<h2 class="font-display text-xl font-semibold tracking-wide text-cream uppercase">Getting here</h2>
				<ul class="mt-4 space-y-3 text-sm text-muted">
					<li class="flex items-start gap-2.5"><TrainFront class="mt-0.5 h-4 w-4 shrink-0 text-lime" /><span><strong class="text-cream">Subway:</strong> Downtown station, 2-minute walk from Exit B.</span></li>
					<li class="flex items-start gap-2.5"><Bus class="mt-0.5 h-4 w-4 shrink-0 text-lime" /><span><strong class="text-cream">Bus:</strong> Routes 4, 12 and 28 stop on Ironworks Avenue.</span></li>
					<li class="flex items-start gap-2.5"><Car class="mt-0.5 h-4 w-4 shrink-0 text-lime" /><span><strong class="text-cream">Parking:</strong> Free on-site parking for members, plus secure bike storage.</span></li>
				</ul>
			</div>
		</div>

		<div class="min-w-0">
			<div class="card p-6" use:reveal>
				<h2 class="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-cream uppercase"><MapPin class="h-5 w-5 text-lime" /> Address</h2>
				<address class="mt-3 text-sm leading-relaxed text-muted not-italic">
					48 Ironworks Avenue, Downtown<br />New York, NY 10001
				</address>
				<div class="mt-4 space-y-2 text-sm">
					<a href="tel:+12125550148" class="flex min-h-11 items-center gap-2 font-semibold text-cream transition hover:text-lime"><Phone class="h-4 w-4 text-lime" /> +1 (212) 555-0148</a>
					<a href="mailto:train@apexathletics.com" class="flex min-h-11 items-center gap-2 font-semibold text-cream transition hover:text-lime"><Mail class="h-4 w-4 text-lime" /> train@apexathletics.com</a>
				</div>
			</div>

			<div class="card mt-6 p-6" use:reveal>
				<h2 class="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-cream uppercase"><Clock class="h-5 w-5 text-lime" /> Opening hours</h2>
				<ul class="mt-4 space-y-2.5">
					{#each hours as h (h.days)}
						<li class="flex items-center justify-between gap-3 border-b border-line pb-2.5 text-sm last:border-0 last:pb-0">
							<span class="text-muted">{h.days}</span><span class="font-semibold text-cream">{h.time}</span>
						</li>
					{/each}
				</ul>
				<p class="mt-4 text-xs leading-relaxed text-muted">Staffed hours are 5:00 AM – 9:00 PM weekdays. Premium and Elite members can train during all open hours.</p>
			</div>

			<div class="mt-6 flex flex-wrap gap-3" use:reveal>
				<a href="/book-a-tour" class="btn-lime">Book a Tour</a>
				<a href="/free-trial" class="btn-ghost">Free 7-Day Trial</a>
			</div>
		</div>
	</div>
</section>
