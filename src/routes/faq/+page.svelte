<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { faqs } from '#lib/data/gym';

	let open = $state(0);

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	});
</script>

<svelte:head>
	<title>FAQ — APEX ATHLETICS</title>
	<meta name="description" content="Frequently asked questions about APEX ATHLETICS — membership, free trial, personal training, opening hours and more." />
	{@html `<script type="application/ld+json">${faqJsonLd}</script>`}
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="text-center" use:reveal>
		<p class="eyebrow">Good questions</p>
		<h1 class="section-title mt-2">Frequently Asked Questions</h1>
		<p class="mx-auto mt-3 max-w-xl text-muted">
			Everything members usually ask before joining. Still unsure? <a href="/contact" class="font-semibold text-lime underline underline-offset-4">Talk to us</a>.
		</p>
	</div>

	<div class="mt-10 space-y-3">
		{#each faqs as faq, i (faq.q)}
			<div class="card min-w-0 overflow-hidden !p-0" use:reveal={{ delay: (i % 3) * 50 }}>
				<button
					type="button"
					aria-expanded={open === i}
					onclick={() => (open = open === i ? -1 : i)}
					class="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"
				>
					<span class="text-sm font-semibold text-cream sm:text-base">{faq.q}</span>
					<ChevronDown
						class="h-5 w-5 shrink-0 text-lime transition-transform duration-300 {open === i ? 'rotate-180' : ''}"
					/>
				</button>
				{#if open === i}
					<p class="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">{faq.a}</p>
				{/if}
			</div>
		{/each}
	</div>

	<div class="card mt-10 p-8 text-center" use:reveal>
		<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">Ready to start?</h2>
		<p class="mx-auto mt-2 max-w-md text-sm text-muted">
			Your first 7 days are free. Come and see the gym, meet a coach and try a class.
		</p>
		<a href="/join" class="btn-lime mt-5">Claim Your Free Trial</a>
	</div>
</section>
