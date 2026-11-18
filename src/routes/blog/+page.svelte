<script lang="ts">
	import { Clock } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { blogPosts } from '#lib/data/gym';
	import { imgSrcSet } from '#lib/img';
</script>

<svelte:head>
	<title>Blog — APEX ATHLETICS</title>
	<meta name="description" content="Training, nutrition and conditioning advice from the APEX ATHLETICS coaches — written by the people who coach it every day." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">From the coaches</p>
		<h1 class="section-title mt-2">Blog</h1>
		<p class="mt-4 leading-relaxed text-muted">
			Practical training advice with no hype — written by the coaches who are on the floor with
			you every day.
		</p>
	</div>

	<div class="mt-10 grid gap-6 md:grid-cols-3">
		{#each blogPosts as post, i (post.slug)}
			<a href="/blog/{post.slug}" class="card group block min-w-0 overflow-hidden" use:reveal={{ delay: i * 70 }}>
				<img
					src={post.image}
					srcset={imgSrcSet(post.image, [480, 800, 1200])}
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
					alt={post.title}
					width="1200"
					height="800"
					loading={i === 0 ? 'eager' : 'lazy'}
					fetchpriority={i === 0 ? 'high' : undefined}
					class="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
				/>
				<div class="p-6">
					<div class="flex items-center gap-3 text-xs text-muted">
						<span class="font-semibold text-lime uppercase">{post.category}</span>
						<span aria-hidden="true">·</span>
						<span>{post.date}</span>
						<span aria-hidden="true">·</span>
						<span class="flex items-center gap-1"><Clock class="h-3.5 w-3.5" /> {post.readTime}</span>
					</div>
					<h2 class="font-display mt-3 text-2xl leading-tight font-semibold tracking-wide text-cream uppercase group-hover:text-lime">
						{post.title}
					</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
					<p class="mt-4 text-sm font-semibold text-cream">By {post.author}</p>
				</div>
			</a>
		{/each}
	</div>
</section>
