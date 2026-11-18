<script lang="ts">
	import { Check, Crown } from '@lucide/svelte';
	import { yearlyPrice, type Plan } from '#lib/data/gym';

	let { plan, billing = 'monthly' }: { plan: Plan; billing?: 'monthly' | 'yearly' } = $props();

	const yearly = $derived(yearlyPrice(plan.monthly));
</script>

<article
	class="card flex min-w-0 flex-col p-6 sm:p-7 {plan.popular
		? 'relative border-lime shadow-[0_0_0_1px_#b7e332,0_16px_40px_rgba(183,227,50,0.08)]'
		: ''}"
>
	{#if plan.popular}
		<span
			class="absolute -top-3.5 left-1/2 flex min-h-7 -translate-x-1/2 items-center gap-1 rounded-full bg-lime px-3 text-[0.65rem] font-bold tracking-wider whitespace-nowrap text-ink uppercase"
		>
			<Crown class="h-3.5 w-3.5" /> Most Popular
		</span>
	{/if}
	<!-- Plan name is h2: on /membership it follows the h1 directly, so h3 would skip a heading level. Visual size is unchanged (same classes). -->
	<h2 class="font-display text-xl font-semibold tracking-wide text-cream uppercase">{plan.name}</h2>
	<p class="mt-1 text-sm text-muted">{plan.blurb}</p>
	<p class="mt-5 flex items-baseline gap-1">
		<span class="font-display text-5xl font-semibold text-cream">
			${billing === 'monthly' ? plan.monthly : yearly.perMonth}
		</span>
		<span class="text-sm text-muted">/month</span>
	</p>
	<p class="mt-1 text-xs text-muted">
		{#if billing === 'monthly'}
			Billed monthly. Cancel with 30 days notice.
		{:else}
			Billed ${yearly.total}/year — 2 months free.
		{/if}
	</p>
	<ul class="mt-6 flex-1 space-y-3">
		{#each plan.features as feature (feature)}
			<li class="flex items-start gap-2.5 text-sm text-cream/90">
				<Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={3} />
				<span>{feature}</span>
			</li>
		{/each}
	</ul>
	<!-- Distinct accessible name per plan: the three "Select Plan" links point to
	     different /join?plan= URLs, and Lighthouse flags identical link text to
	     different destinations. The plan name is real (visually hidden) text so the
	     visible label stays exactly "Select Plan". -->
	<a href="/join?plan={plan.name.toLowerCase()}" class="btn-lime mt-7 w-full"
		>Select Plan <span class="sr-only">— {plan.name}</span></a
	>
</article>
