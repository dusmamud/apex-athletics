<script lang="ts">
	import { Calculator } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { programs } from '#lib/data/gym';

	let heightCm = $state(175);
	let weightKg = $state(80);

	const bmi = $derived(weightKg / Math.pow(heightCm / 100, 2));
	const category = $derived(
		bmi < 18.5
			? { label: 'Underweight', advice: 'Focus on building strength and muscle with a calorie surplus and a structured strength program.', program: 'strength-training', color: 'text-gold' }
			: bmi < 25
				? { label: 'Healthy weight', advice: 'Great base. Build strength and conditioning to raise your fitness ceiling.', program: 'strength-training', color: 'text-lime' }
				: bmi < 30
					? { label: 'Overweight', advice: 'A mix of HIIT and strength training is the fastest route — burn fat while keeping muscle.', program: 'hiit', color: 'text-gold' }
					: { label: 'Obese', advice: 'Start with coached, low-impact conditioning and personal training — safe, sustainable progress first.', program: 'personal-training', color: 'text-red-400' }
	);
	const recommended = $derived(programs.find((p) => p.slug === category.program));
</script>

<svelte:head>
	<title>BMI Calculator — APEX ATHLETICS</title>
	<meta
		name="description"
		content="Free BMI calculator from APEX ATHLETICS. Enter your height and weight, get your BMI and category, and a recommended training program."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="mx-auto max-w-3xl">
		<div class="text-center" use:reveal>
			<p class="eyebrow">Know your starting point</p>
			<h1 class="section-title mt-2">BMI Calculator</h1>
			<p class="mx-auto mt-3 max-w-xl text-muted">
				Body Mass Index is a rough starting point, not a verdict. Use it to pick the right
				program — then let a coach measure what actually matters.
			</p>
		</div>

		<div class="card mt-10 p-6 sm:p-8" use:reveal>
			<div class="grid gap-6 sm:grid-cols-2">
				<div>
					<label for="height" class="label">Height — {heightCm} cm</label>
					<input
						id="height"
						type="range"
						min="140"
						max="210"
						step="1"
						bind:value={heightCm}
						class="w-full accent-[#b7e332]"
						aria-label="Height in centimetres"
					/>
					<div class="mt-1 flex justify-between text-xs text-muted"><span>140 cm</span><span>210 cm</span></div>
				</div>
				<div>
					<label for="weight" class="label">Weight — {weightKg} kg</label>
					<input
						id="weight"
						type="range"
						min="40"
						max="180"
						step="1"
						bind:value={weightKg}
						class="w-full accent-[#b7e332]"
						aria-label="Weight in kilograms"
					/>
					<div class="mt-1 flex justify-between text-xs text-muted"><span>40 kg</span><span>180 kg</span></div>
				</div>
			</div>

			<div class="mt-8 flex flex-col items-center gap-2 border-t border-line pt-8 text-center">
				<p class="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted uppercase">
					<Calculator class="h-4 w-4 text-lime" /> Your BMI
				</p>
				<p class="font-display text-6xl font-semibold text-cream">{bmi.toFixed(1)}</p>
				<p class="text-lg font-bold {category.color}">{category.label}</p>
				<p class="max-w-md text-sm leading-relaxed text-muted">{category.advice}</p>
			</div>

			{#if recommended}
				<div class="mt-8 flex flex-col items-center gap-3 rounded-xl border border-lime/40 bg-lime/5 p-5 text-center sm:flex-row sm:text-left">
					<img src={recommended.image} alt={recommended.name} width="400" height="267" loading="lazy" class="h-20 w-32 shrink-0 rounded-lg object-cover" />
					<div class="min-w-0 flex-1">
						<p class="text-xs font-semibold tracking-wider text-muted uppercase">Recommended program</p>
						<p class="font-display text-xl font-semibold tracking-wide text-cream uppercase">{recommended.name}</p>
						<p class="text-sm text-muted">{recommended.tagline}</p>
					</div>
					<a href="/programs/{recommended.slug}" class="btn-lime shrink-0">View Program</a>
				</div>
			{/if}

			<p class="mt-6 text-center text-xs leading-relaxed text-muted">
				BMI does not distinguish muscle from fat — athletes often score as “overweight”. It is a
				screening tool only, not medical advice. For a full assessment, book a free session with
				a coach.
			</p>
		</div>

		<div class="mt-8 grid gap-4 text-center sm:grid-cols-4">
			{#each [{ range: 'Below 18.5', label: 'Underweight' }, { range: '18.5 – 24.9', label: 'Healthy' }, { range: '25 – 29.9', label: 'Overweight' }, { range: '30 and above', label: 'Obese' }] as band (band.label)}
				<div class="card min-w-0 p-4">
					<p class="font-display text-lg font-semibold text-cream">{band.range}</p>
					<p class="text-xs text-muted">{band.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
