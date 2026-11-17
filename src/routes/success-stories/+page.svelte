<script lang="ts">
	import { Quote } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { successStories } from '#lib/data/gym';
</script>

<svelte:head>
	<title>Success Stories — APEX ATHLETICS</title>
	<meta
		name="description"
		content="Real transformations from real APEX ATHLETICS members — weight loss, strength gains and first races, with before-and-after numbers."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">Real results, real people</p>
		<h1 class="section-title mt-2">Success Stories</h1>
		<p class="mt-4 leading-relaxed text-muted">
			No stock photos, no overnight miracles. These are members who showed up, followed a plan
			and let the numbers speak.
		</p>
	</div>

	<div class="mt-10 grid gap-6 md:grid-cols-2">
		{#each successStories as story, i (story.name)}
			<article class="card min-w-0 overflow-hidden" use:reveal={{ delay: (i % 2) * 70 }}>
				<img
					src={story.image}
					alt="{story.name} training at APEX ATHLETICS"
					width="1000"
					height="667"
					loading="lazy"
					class="aspect-[16/9] w-full object-cover"
				/>
				<div class="p-6">
					<div class="flex flex-wrap items-center justify-between gap-2">
						<h2 class="font-display text-2xl font-semibold tracking-wide text-cream uppercase">
							{story.name}, {story.age}
						</h2>
						<span class="chip !border-lime/50 !text-lime">{story.program}</span>
					</div>
					<blockquote class="mt-4 flex gap-3 text-sm leading-relaxed text-cream/90">
						<Quote class="h-5 w-5 shrink-0 text-lime" />
						<span>“{story.quote}”</span>
					</blockquote>
					<dl class="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5">
						{#each story.stats as stat (stat.label)}
							<div class="min-w-0">
								<dt class="text-[0.65rem] font-semibold tracking-wider text-muted uppercase">{stat.label}</dt>
								<dd class="font-display mt-1 text-lg leading-tight font-semibold text-lime">{stat.value}</dd>
							</div>
						{/each}
					</dl>
				</div>
			</article>
		{/each}
	</div>

	<div class="card mt-10 p-8 text-center" use:reveal>
		<h2 class="font-display text-3xl font-semibold tracking-wide text-cream uppercase">Your story starts here</h2>
		<p class="mx-auto mt-3 max-w-xl text-muted">
			Every story above started with one free trial session. Yours can too.
		</p>
		<a href="/join" class="btn-lime mt-6">Claim Your Free Trial</a>
	</div>
</section>
