<script lang="ts">
	import { Check, Minus } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import PlanCard from '#lib/components/PlanCard.svelte';
	import { plans } from '#lib/data/gym';

	let billing: 'monthly' | 'yearly' = $state('monthly');

	const compareRows: { feature: string; values: (boolean | string)[] }[] = [
		{ feature: 'Open floor access', values: [true, true, true] },
		{ feature: 'Group classes', values: ['1 / week', 'Unlimited', 'Unlimited'] },
		{ feature: 'Personal training sessions / month', values: ['—', '2', '4'] },
		{ feature: 'Sauna access', values: [false, true, true] },
		{ feature: 'Nutrition starter plan', values: [false, true, true] },
		{ feature: 'Guest passes / month', values: ['—', '1', '2'] },
		{ feature: 'Body-composition scan', values: [false, false, true] },
		{ feature: 'Priority class booking', values: [false, false, true] },
		{ feature: 'Recovery room', values: [false, false, true] }
	];
</script>

<svelte:head>
	<title>Membership Plans — APEX ATHLETICS</title>
	<meta
		name="description"
		content="APEX ATHLETICS membership: Basic $120, Premium $180, Elite $250 per month. Yearly billing saves 2 months. 7-day free trial, no joining fee."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="text-center" use:reveal>
		<p class="eyebrow">Join us</p>
		<h1 class="section-title mt-2">Membership Plans</h1>
		<p class="mx-auto mt-3 max-w-xl text-muted">
			Simple pricing, no joining fee, no lock-in on monthly plans. Every plan starts with a
			7-day free trial.
		</p>
	</div>

	<div
		class="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full border border-line bg-panel p-1"
		role="group"
		aria-label="Billing period"
	>
		<button
			type="button"
			aria-pressed={billing === 'monthly'}
			onclick={() => (billing = 'monthly')}
			class="min-h-11 rounded-full px-5 text-sm font-semibold transition {billing === 'monthly'
				? 'bg-lime text-ink'
				: 'text-cream hover:text-lime'}"
		>
			Monthly
		</button>
		<button
			type="button"
			aria-pressed={billing === 'yearly'}
			onclick={() => (billing = 'yearly')}
			class="min-h-11 rounded-full px-5 text-sm font-semibold transition {billing === 'yearly'
				? 'bg-lime text-ink'
				: 'text-cream hover:text-lime'}"
		>
			Yearly <span class="ml-1 text-xs font-bold {billing === 'yearly' ? 'text-ink' : 'text-lime'}">−15%</span>
		</button>
	</div>
	<p class="mt-3 text-center text-xs text-muted">
		Yearly billing = 10 months for 12. You save 2 months on every plan.
	</p>

	<div class="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-3">
		{#each plans as plan, i (plan.name)}
			<div use:reveal={{ delay: i * 70 }} class="min-w-0">
				<PlanCard {plan} {billing} />
			</div>
		{/each}
	</div>

	<div class="mx-auto mt-16 max-w-5xl" use:reveal>
		<h2 class="font-display text-center text-2xl font-semibold tracking-wide text-cream uppercase">
			Compare plans
		</h2>
		<div class="card mt-6 overflow-x-auto p-0">
			<table class="w-full min-w-[560px] border-collapse text-sm">
				<thead>
					<tr class="border-b border-line text-left">
						<th scope="col" class="px-5 py-4 font-semibold text-cream">Feature</th>
						{#each plans as plan (plan.name)}
							<th scope="col" class="px-5 py-4 text-center font-semibold text-cream">
								{plan.name}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each compareRows as row (row.feature)}
						<tr class="border-b border-line last:border-0">
							<th scope="row" class="px-5 py-3.5 text-left font-normal text-muted">{row.feature}</th>
							{#each row.values as value, vi (vi)}
								<td class="px-5 py-3.5 text-center text-cream">
									{#if value === true}
										<Check class="mx-auto h-4 w-4 text-lime" strokeWidth={3} />
									{:else if value === false}
										<Minus class="mx-auto h-4 w-4 text-muted" />
									{:else}
										{value}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="mx-auto mt-12 max-w-5xl text-center" use:reveal>
		<p class="text-sm text-muted">
			All plans include locker room access, the APEX app and a fitness assessment on joining.
			Questions? <a href="/faq" class="font-semibold text-lime underline underline-offset-4">Read the FAQ</a> or
			<a href="/contact" class="font-semibold text-lime underline underline-offset-4">talk to us</a>.
		</p>
		<a href="/join" class="btn-lime mt-6">Claim Your Free Trial</a>
	</div>
</section>
