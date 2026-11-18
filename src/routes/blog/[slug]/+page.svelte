<script lang="ts">
	import { Clock } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { imgSrcSet } from '#lib/img';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
	const others = $derived(data.others);
</script>

<!-- Open Graph + article:published_time for this post are set in +layout.svelte
     from the same post data, so they are not duplicated here. -->
<svelte:head>
	<title>{post.title} — APEX ATHLETICS Blog</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<nav aria-label="Breadcrumb" class="text-sm text-muted">
		<a href="/" class="hover:text-lime">Home</a> <span aria-hidden="true">/</span>
		<a href="/blog" class="hover:text-lime">Blog</a> <span aria-hidden="true">/</span>
		<span class="text-cream">{post.category}</span>
	</nav>
	<h1 class="font-display mt-6 text-4xl leading-tight font-semibold tracking-wide text-cream uppercase sm:text-5xl">
		{post.title}
	</h1>
	<p class="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
		<span class="font-semibold text-lime">By {post.author}</span>
		<span aria-hidden="true">·</span>
		<span>{post.date}</span>
		<span aria-hidden="true">·</span>
		<span class="flex items-center gap-1"><Clock class="h-4 w-4" /> {post.readTime}</span>
	</p>
	<img
		src={post.image}
		srcset={imgSrcSet(post.image, [640, 960, 1200])}
		sizes="(max-width: 768px) 100vw, 768px"
		alt={post.title}
		width="1200"
		height="800"
		fetchpriority="high"
		class="mt-8 aspect-[16/9] w-full rounded-2xl border border-line object-cover"
	/>
	<div class="mt-8 space-y-5 text-base leading-relaxed text-cream/85">
		{#each post.body as para (para)}
			<p>{para}</p>
		{/each}
	</div>

	<div class="card mt-12 p-6 text-center">
		<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">Put it into practice</h2>
		<p class="mx-auto mt-2 max-w-md text-sm text-muted">
			Reading helps. Coaching helps more. Try a free week and let a coach build the plan for you.
		</p>
		<a href="/join" class="btn-lime mt-5">Claim Your Free Trial</a>
	</div>

	<div class="mt-12">
		<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">More from the blog</h2>
		<div class="mt-6 grid gap-5 sm:grid-cols-2">
			{#each others as other (other.slug)}
				<a href="/blog/{other.slug}" class="card group block min-w-0 overflow-hidden">
					<img
						src={other.image}
						srcset={imgSrcSet(other.image, [480, 800, 1200])}
						sizes="(max-width: 640px) 100vw, 50vw"
						alt={other.title}
						width="1200"
						height="800"
						loading="lazy"
						class="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
					/>
					<div class="p-5">
						<h3 class="font-display text-lg leading-tight font-semibold tracking-wide text-cream uppercase group-hover:text-lime">{other.title}</h3>
						<p class="mt-1 text-xs text-muted">{other.date} · {other.readTime}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</article>
