<script lang="ts">
	import { Apple, Check, Flame } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';

	const sampleDay = [
		{ meal: 'Breakfast', food: 'Greek yoghurt, oats, berries and a scoop of protein', kcal: '520 kcal · 38 g protein' },
		{ meal: 'Lunch', food: 'Grilled chicken, rice, roast vegetables and olive oil', kcal: '640 kcal · 52 g protein' },
		{ meal: 'Post-training', food: 'Protein shake, banana and a handful of almonds', kcal: '380 kcal · 32 g protein' },
		{ meal: 'Dinner', food: 'Salmon or tofu, sweet potato and a big salad', kcal: '610 kcal · 44 g protein' }
	];
	const principles = [
		{ title: 'Protein first', text: 'Roughly 1.6–2 g per kilogram of bodyweight per day, spread across 3–4 meals. It is the single biggest lever for muscle and fat loss.' },
		{ title: 'Eat enough to train', text: 'Under-eating while training hard leads to fatigue and injury, not leanness. Food is checked before the program when performance drops.' },
		{ title: 'Built around your food', text: 'No printout diets. Your coach builds the plan around what you already eat, your schedule and your budget.' },
		{ title: 'Habits, not willpower', text: 'A five-minute breakfast, a post-training meal you like, a plan for busy Tuesdays. Small systems beat big resolutions.' }
	];
</script>

<svelte:head>
	<title>Nutrition Coaching — APEX ATHLETICS</title>
	<meta name="description" content="Nutrition coaching at APEX ATHLETICS: realistic meal plans built around your food, plus a sample training day. Included in Premium and Elite." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">Fuel the training</p>
		<h1 class="section-title mt-2">Nutrition Coaching</h1>
		<p class="mt-4 leading-relaxed text-muted">
			Training builds the stimulus; food builds the result. Our coaches help you eat for your
			goal without a diet that falls apart on a busy Tuesday.
		</p>
	</div>

	<div class="mt-10 grid gap-5 sm:grid-cols-2">
		{#each principles as p, i (p.title)}
			<article class="card min-w-0 p-6" use:reveal={{ delay: (i % 2) * 90 }}>
				<h2 class="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-cream uppercase"><Apple class="h-5 w-5 text-lime" /> {p.title}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-14 max-w-4xl" use:reveal>
		<h2 class="font-display text-center text-2xl font-semibold tracking-wide text-cream uppercase">A sample training day</h2>
		<p class="mx-auto mt-2 max-w-xl text-center text-sm text-muted">About 2,150 kcal and 165 g protein — an example for an 80 kg member training four times a week. Your plan is built for your body and goal.</p>
		<div class="mt-8 space-y-3">
			{#each sampleDay as m (m.meal)}
				<div class="card flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
					<div class="min-w-0">
						<p class="text-xs font-bold tracking-wider text-lime uppercase">{m.meal}</p>
						<p class="mt-1 text-sm leading-relaxed text-cream/90">{m.food}</p>
					</div>
					<p class="flex shrink-0 items-center gap-1.5 text-xs font-semibold whitespace-nowrap text-muted"><Flame class="h-4 w-4 text-lime" /> {m.kcal}</p>
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center">
			<a href="/calculators" class="btn-ghost">Work Out Your Calories</a>
			<a href="/join" class="btn-lime ml-3">Start With a Coach</a>
		</div>
		<p class="mt-6 flex items-start justify-center gap-2 text-xs leading-relaxed text-muted"><Check class="mt-0.5 h-4 w-4 shrink-0 text-lime" /> Nutrition starter plan included in Premium and Elite memberships.</p>
	</div>
</section>
