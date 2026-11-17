<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';

	let { children }: LayoutProps = $props();

	const gymJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ExerciseGym',
		name: 'APEX ATHLETICS',
		description:
			'Train with purpose. Get stronger every day. Strength training, personal training, HIIT and conditioning with expert coaches.',
		url: 'https://apex-athletics.pages.dev/',
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
