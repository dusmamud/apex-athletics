<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page Not Found' : 'Something went wrong'} — APEX ATHLETICS</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
	<p class="eyebrow">Error {page.status}</p>
	<h1 class="font-display mt-4 text-6xl font-semibold tracking-wide text-cream uppercase sm:text-7xl">
		{page.status === 404 ? 'Lost your rep?' : 'Something went wrong'}
	</h1>
	<p class="mx-auto mt-4 max-w-md text-muted">
		{page.status === 404
			? 'This page does not exist or has moved. Head back to the gym floor and find what you were looking for.'
			: 'An unexpected error stopped this page loading. Please try again.'}
	</p>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
		<a href="/" class="btn-lime">Back to Home</a>
		<a href="/programs" class="btn-ghost">Browse Programs</a>
	</div>
</section>
