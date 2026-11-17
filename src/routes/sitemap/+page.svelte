<script lang="ts">
	import { allRoutes } from '#lib/data/gym';

	const groups = [
		{ title: 'Main pages', routes: ['/', '/about', '/contact', '/join', '/faq', '/sitemap'] },
		{ title: 'Programs', routes: allRoutes.filter((r) => r.startsWith('/programs')) },
		{ title: 'Coaches', routes: allRoutes.filter((r) => r.startsWith('/coaches')) },
		{ title: 'Training & tools', routes: ['/membership', '/schedule', '/success-stories', '/bmi-calculator'] },
		{ title: 'Blog', routes: allRoutes.filter((r) => r.startsWith('/blog')) },
		{ title: 'Legal', routes: ['/privacy-policy', '/terms'] }
	];
</script>

<svelte:head>
	<title>Sitemap — APEX ATHLETICS</title>
	<meta name="description" content="Every page on the APEX ATHLETICS website — programs, coaches, membership, schedule, blog and more." />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<p class="eyebrow">All pages</p>
	<h1 class="section-title mt-2">Sitemap</h1>
	<p class="mt-4 text-muted">
		Every page on this site. A machine-readable version is available at
		<a href="/sitemap.xml" class="font-semibold text-lime underline underline-offset-4">sitemap.xml</a>.
	</p>
	<div class="mt-10 grid gap-8 sm:grid-cols-2">
		{#each groups as group (group.title)}
			<div class="min-w-0">
				<h2 class="font-display text-lg font-semibold tracking-wide text-cream uppercase">{group.title}</h2>
				<ul class="mt-3 space-y-1">
					{#each group.routes as route (route)}
						<li>
							<a href={route} class="inline-flex min-h-8 items-center text-sm text-muted transition hover:text-lime">
								{route}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>
