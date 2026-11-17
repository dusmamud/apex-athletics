<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';
	import Header from '#lib/components/Header.svelte';
	import { Phone } from '@lucide/svelte';
import Footer from '#lib/components/Footer.svelte';

	let { children }: LayoutProps = $props();

	const gymJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ExerciseGym',
		name: 'APEX ATHLETICS',
		description:
			'Train with purpose. Get stronger every day. Strength training, personal training, HIIT and conditioning with expert coaches.',
		url: 'https://apex-athletics-gym.pages.dev/',
		telephone: '+1-212-555-0148',
		email: 'train@apexathletics.com',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '48 Ironworks Avenue',
			addressLocality: 'New York',
			addressRegion: 'NY',
			postalCode: '10001',
			addressCountry: 'US'
		},
		openingHours: ['Mo-Sa 05:00-22:00', 'Su 07:00-20:00'],
		priceRange: '$120 - $250'
	});
</script>

<svelte:head>
	<title>APEX ATHLETICS — Built by Discipline | Gym, Strength, HIIT & Personal Training</title>
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="APEX ATHLETICS" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	{@html `<script type="application/ld+json">${gymJsonLd}</script>`}
</svelte:head>

<Header />
<main class="min-h-[60vh]">{@render children()}</main>
<Footer />
<!-- Spacer so the sticky mobile bar never covers footer content -->
<div class="h-16 md:hidden" aria-hidden="true"></div>
<nav aria-label="Quick actions" class="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-line bg-ink/95 px-4 py-2.5 backdrop-blur md:hidden">
	<a href="/free-trial" class="btn-lime flex-1 !py-2.5 text-xs">7 Days Free</a>
	<a href="tel:+12125550148" class="btn-ghost flex-1 !py-2.5 text-xs"><Phone class="h-4 w-4" /> Call the Gym</a>
</nav>
