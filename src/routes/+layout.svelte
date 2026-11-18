<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
	import type { LayoutProps } from './$types';
	import Header from '#lib/components/Header.svelte';
	import { Phone } from '@lucide/svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { coaches, IMAGES } from '#lib/data/gym';
	import { imgSrcSet } from '#lib/img';

	// Preload the critical font files (the same woff2 files the inlined
	// @font-face rules reference — Vite resolves the hashed URLs, so the
	// preload href always matches the @font-face src exactly).
	import oswald600Url from '@fontsource/oswald/files/oswald-latin-600-normal.woff2?url';
	import inter400Url from '@fontsource/inter/files/inter-latin-400-normal.woff2?url';
	import inter700Url from '@fontsource/inter/files/inter-latin-700-normal.woff2?url';

	let { children }: LayoutProps = $props();

	const SITE_URL = 'https://apex-athletics-gym.pages.dev';
	const SITE_NAME = 'APEX ATHLETICS';
	const DEFAULT_TITLE = 'APEX ATHLETICS — Strength, HIIT & Conditioning Gym in New York';
	const DEFAULT_DESCRIPTION =
		'Train with purpose. Get stronger every day. Strength training, personal training, HIIT and conditioning with expert coaches.';

	// Per-route Open Graph title/description, copied from each page's own
	// <meta name="description"> so crawlers see the same copy as the page.
	// Routes not listed here fall back to the site default (still valid OG).
	const OG_META: Record<string, { title: string; description: string }> = {
		'/': {
			title: 'APEX ATHLETICS — Built by Discipline | Gym, Strength, HIIT & Personal Training',
			description: DEFAULT_DESCRIPTION
		},
		'/membership': {
			title: 'Membership Plans — APEX ATHLETICS',
			description:
				'APEX ATHLETICS membership: Basic $120, Premium $180, Elite $250 per month. Yearly billing saves 2 months. 7-day free trial, no joining fee.'
		},
		'/coaches': {
			title: 'Meet Our Coaches — APEX ATHLETICS',
			description:
				'Meet the APEX ATHLETICS coaching team: Alex Chen, Maria Rodriguez and David Park — certified strength, HIIT and performance coaches.'
		},
		'/programs': {
			title: 'Training Programs — APEX ATHLETICS',
			description:
				'Strength training, personal training, HIIT and conditioning at APEX ATHLETICS. Structured programs, small groups, expert coaches.'
		},
		'/facilities': {
			title: 'Facilities & Equipment — APEX ATHLETICS',
			description:
				'Inside APEX ATHLETICS: strength floor, cardio zone, functional turf and recovery suite — 6,000 sq ft of equipment in New York.'
		},
		'/gallery': {
			title: 'Photo Gallery — APEX ATHLETICS',
			description:
				'Inside APEX ATHLETICS: real photos of the strength floor, classes, cardio zone, turf and recovery suite.'
		},
		'/classes': {
			title: 'Classes by Goal — APEX ATHLETICS',
			description:
				'Find the right class for your goal: build strength, lose fat, move better or perform in sport. Every class is coached, every level welcome.'
		},
		'/success-stories': {
			title: 'Success Stories — APEX ATHLETICS',
			description:
				'Real transformations from real APEX ATHLETICS members — weight loss, strength gains and first races, with before-and-after numbers.'
		},
		'/blog': {
			title: 'Blog — APEX ATHLETICS',
			description:
				'Training, nutrition and conditioning advice from the APEX ATHLETICS coaches — written by the people who coach it every day.'
		},
		'/about': {
			title: 'About APEX ATHLETICS — Our Story, Values & Team',
			description:
				'APEX ATHLETICS has helped New York train with purpose for over 15 years. Meet the team, our values and the gym behind 2,400+ members.'
		}
	};

	const canonical = $derived(`${SITE_URL}${page.url.pathname}`);
	const isHome = $derived(page.url.pathname === '/');

	// Dynamic routes pass their entity through load(): blog [slug] -> post,
	// coaches [slug] -> coach, programs [slug] -> program.
	const post = $derived(page.data.post);
	const coach = $derived(page.data.coach);
	const program = $derived(page.data.program);

	const ogType = $derived(post ? 'article' : 'website');
	const ogTitle = $derived(
		post
			? `${post.title} — APEX ATHLETICS Blog`
			: coach
				? `${coach.name} — ${coach.role} | APEX ATHLETICS`
				: program
					? `${program.name} — APEX ATHLETICS`
					: (OG_META[page.url.pathname]?.title ?? DEFAULT_TITLE)
	);
	const ogDescription = $derived(
		post
			? post.excerpt
			: coach
				? `${coach.name}, ${coach.role} at APEX ATHLETICS. ${coach.credentials}.`
				: program
					? program.description
					: (OG_META[page.url.pathname]?.description ?? DEFAULT_DESCRIPTION)
	);
	const ogImage = $derived(post?.image ?? coach?.image ?? program?.image ?? IMAGES.hero);
	// Blog post dates are publication dates in New York (Oct/Nov = EST, -05:00).
	// Rich Results Test rejects date-only values ("Invalid datetime value" +
	// "missing timezone"), so emit a full ISO datetime with the offset. The dates
	// themselves come from the post data — only the time + offset are added.
	const postDateTime = $derived.by(() => {
		if (!post) return undefined;
		const d = new Date(post.date);
		const pad = (n: number) => String(n).padStart(2, '0');
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T09:00:00-05:00`;
	});
	// Author profile URL for the BlogPosting author — only when the author is a
	// coach with a page; otherwise the url is omitted, never invented.
	const authorCoach = $derived(post ? coaches.find((c) => c.name === post.author) : undefined);
	const authorUrl = $derived(authorCoach ? `${SITE_URL}/coaches/${authorCoach.slug}` : undefined);
	const heroSrcSet = imgSrcSet(IMAGES.hero, [640, 960, 1280, 1600]);

	const jsonLd = $derived.by(() => {
		const graph: Record<string, unknown>[] = [
			{
				'@type': 'ExerciseGym',
				'@id': `${SITE_URL}/#gym`,
				name: SITE_NAME,
				description: DEFAULT_DESCRIPTION,
				url: SITE_URL,
				image: IMAGES.hero,
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
				// Approximate ZIP-level coordinates for 10001, Manhattan.
				// "48 Ironworks Avenue" is fictional demo copy, so no exact
				// street-level coordinate exists for it.
				geo: { '@type': 'GeoCoordinates', latitude: 40.75431, longitude: -74.00119 },
				openingHours: ['Mo-Sa 05:00-22:00', 'Su 07:00-20:00'],
				priceRange: '$120 - $250',
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: 4.9,
					reviewCount: 2841
				},
				sameAs: ['https://instagram.com', 'https://facebook.com', 'https://youtube.com']
			}
		];

		if (post && postDateTime) {
			graph.push({
				'@type': 'BlogPosting',
				headline: post.title,
				description: post.excerpt,
				image: post.image,
				datePublished: postDateTime,
				dateModified: postDateTime,
				author: {
					'@type': 'Person',
					name: post.author,
					...(authorUrl ? { url: authorUrl } : {})
				},
				publisher: { '@type': 'ExerciseGym', '@id': `${SITE_URL}/#gym`, name: SITE_NAME },
				mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
			});
		}

		if (coach) {
			graph.push({
				'@type': 'Person',
				name: coach.name,
				jobTitle: coach.role,
				description: coach.bio[0],
				image: coach.image,
				url: canonical,
				worksFor: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
				hasCredential: coach.credentials
			});
		}

		if (program) {
			const minutes = parseInt(program.duration, 10);
			graph.push({
				'@type': 'ExercisePlan',
				name: program.name,
				description: program.description,
				url: canonical,
				...(Number.isFinite(minutes) ? { activityDuration: `PT${minutes}M` } : {}),
				activityFrequency: `${program.schedule.length} times per week`,
				exerciseType: program.name
			});
		}

		return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
	});
</script>

<svelte:head>
	<title>APEX ATHLETICS — Built by Discipline | Gym, Strength, HIIT & Personal Training</title>
	<link rel="canonical" href={canonical} />
	<!-- Preload the critical font files so the FOUT swap happens earlier and
	     shifts less (Oswald 600 = display headings, Inter 400/700 = body + bold). -->
	<link rel="preload" href={oswald600Url} as="font" type="font/woff2" crossorigin />
	<link rel="preload" href={inter400Url} as="font" type="font/woff2" crossorigin />
	<link rel="preload" href={inter700Url} as="font" type="font/woff2" crossorigin />
	<meta property="og:type" content={ogType} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={ogTitle} />
	<meta name="twitter:description" content={ogDescription} />
	<meta name="twitter:image" content={ogImage} />
	{#if post && postDateTime}
		<meta property="article:published_time" content={postDateTime} />
		<meta property="article:modified_time" content={postDateTime} />
		<meta property="article:author" content={post.author} />
	{/if}
	{#if isHome}
		<!-- Preload the LCP hero image with the same srcset/sizes as the <img> -->
		<link
			rel="preload"
			as="image"
			imagesrcset={heroSrcSet}
			imagesizes="(max-width: 1023px) calc(100vw - 2rem), 584px"
			fetchpriority="high"
		/>
	{/if}
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
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
