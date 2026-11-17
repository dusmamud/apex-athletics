<script lang="ts">
	import { Calculator } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import { programs } from '#lib/data/gym';

	let tab = $state<'bmi' | 'tdee' | 'onerm'>('bmi');

	// ---- BMI ----
	let heightCm = $state(175);
	let weightKg = $state(80);
	const bmi = $derived(weightKg / Math.pow(heightCm / 100, 2));
	const bmiCat = $derived(
		bmi < 18.5
			? { label: 'Underweight', advice: 'Focus on building strength and muscle with a calorie surplus and a structured strength program.', program: 'strength-training', color: 'text-gold' }
			: bmi < 25
				? { label: 'Healthy weight', advice: 'Great base. Build strength and conditioning to raise your fitness ceiling.', program: 'strength-training', color: 'text-lime' }
				: bmi < 30
					? { label: 'Overweight', advice: 'A mix of HIIT and strength training is the fastest route — burn fat while keeping muscle.', program: 'hiit', color: 'text-gold' }
					: { label: 'Obese', advice: 'Start with coached, low-impact conditioning and personal training — safe, sustainable progress first.', program: 'personal-training', color: 'text-red-400' }
	);
	const bmiProgram = $derived(programs.find((p) => p.slug === bmiCat.program));

	// ---- TDEE ----
	let age = $state(30);
	let sex = $state<'male' | 'female'>('male');
	let activity = $state(1.55);
	const bmr = $derived(
		sex === 'male'
			? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
			: 10 * weightKg + 6.25 * heightCm - 5 * age - 161
	);
	const tdee = $derived(Math.round(bmr * activity));

	// ---- 1RM ----
	let liftWeight = $state(100);
	let liftReps = $state(5);
	const oneRm = $derived(Math.round(liftWeight * (1 + liftReps / 30)));
	const percentages = $derived(
		[95, 90, 85, 80, 75, 70, 60].map((p) => ({ pct: p, kg: Math.round((oneRm * p) / 100) }))
	);
</script>

<svelte:head>
	<title>Fitness Calculators — APEX ATHLETICS</title>
	<meta name="description" content="Free fitness calculators: BMI, daily calorie needs (TDEE) and one-rep max (1RM). Get your numbers, then train with a coach." />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="mx-auto max-w-3xl text-center" use:reveal>
		<p class="eyebrow">Know your numbers</p>
		<h1 class="section-title mt-2">Fitness Calculators</h1>
		<p class="mx-auto mt-3 max-w-xl text-muted">
			BMI, daily calories and one-rep max — three numbers that tell you where to start.
			Use the same height and weight across all three.
		</p>
	</div>

	<div class="mx-auto mt-8 flex w-fit flex-wrap justify-center gap-1 rounded-full border border-line bg-panel p-1" role="group" aria-label="Calculator">
		{#each [{ id: 'bmi', label: 'BMI' }, { id: 'tdee', label: 'Calories (TDEE)' }, { id: 'onerm', label: 'One-Rep Max' }] as t (t.id)}
			<button
				type="button"
				aria-pressed={tab === t.id}
				onclick={() => (tab = t.id as typeof tab)}
				class="min-h-11 rounded-full px-5 text-sm font-semibold transition {tab === t.id ? 'bg-lime text-ink' : 'text-cream hover:text-lime'}"
			>
				{t.label}
			</button>
		{/each}
	</div>

	<div class="mx-auto mt-8 max-w-3xl">
		{#if tab === 'bmi'}
			<div class="card p-6 sm:p-8" use:reveal>
				<h2 class="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-cream uppercase"><Calculator class="h-5 w-5 text-lime" /> BMI Calculator</h2>
				<div class="mt-6 grid gap-6 sm:grid-cols-2">
					<div>
						<label for="calc-height" class="label">Height — {heightCm} cm</label>
						<input id="calc-height" type="range" min="140" max="210" step="1" bind:value={heightCm} class="w-full accent-[#b7e332]" aria-label="Height in centimetres" />
						<div class="mt-1 flex justify-between text-xs text-muted"><span>140 cm</span><span>210 cm</span></div>
					</div>
					<div>
						<label for="calc-weight" class="label">Weight — {weightKg} kg</label>
						<input id="calc-weight" type="range" min="40" max="160" step="1" bind:value={weightKg} class="w-full accent-[#b7e332]" aria-label="Weight in kilograms" />
						<div class="mt-1 flex justify-between text-xs text-muted"><span>40 kg</span><span>160 kg</span></div>
					</div>
				</div>
				<div class="mt-6 rounded-lg border border-line bg-panel-2 p-5 text-center">
					<p class="text-xs font-bold tracking-wider text-muted uppercase">Your BMI</p>
					<p class="font-display mt-1 text-5xl font-semibold text-cream">{bmi.toFixed(1)}</p>
					<p class="mt-1 text-sm font-semibold {bmiCat.color}">{bmiCat.label}</p>
					<p class="mx-auto mt-2 max-w-md text-sm text-muted">{bmiCat.advice}</p>
					{#if bmiProgram}
						<a href="/programs/{bmiProgram.slug}" class="btn-lime mt-4">Try {bmiProgram.name}</a>
					{/if}
				</div>
				<p class="mt-4 text-center text-xs text-muted">BMI is a rough starting point, not a verdict. A coach measures what actually matters. Also on its own page: <a href="/bmi-calculator" class="font-semibold text-lime underline underline-offset-4">BMI Calculator</a>.</p>
			</div>
		{:else if tab === 'tdee'}
			<div class="card p-6 sm:p-8" use:reveal>
				<h2 class="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-cream uppercase"><Calculator class="h-5 w-5 text-lime" /> Daily Calories (TDEE)</h2>
				<p class="mt-2 text-sm text-muted">Mifflin-St Jeor formula. Uses your height and weight above.</p>
				<div class="mt-6 grid gap-6 sm:grid-cols-2">
					<div>
						<label for="calc-age" class="label">Age — {age} years</label>
						<input id="calc-age" type="range" min="16" max="80" step="1" bind:value={age} class="w-full accent-[#b7e332]" aria-label="Age in years" />
					</div>
					<div>
						<label for="calc-sex" class="label">Sex</label>
						<select id="calc-sex" class="input" bind:value={sex}><option value="male">Male</option><option value="female">Female</option></select>
					</div>
					<div class="sm:col-span-2">
						<label for="calc-activity" class="label">Activity level</label>
						<select id="calc-activity" class="input" bind:value={activity}>
							<option value={1.2}>Sedentary — desk job, little exercise</option>
							<option value={1.375}>Light — 1–3 workouts a week</option>
							<option value={1.55}>Moderate — 3–5 workouts a week</option>
							<option value={1.725}>Active — 6–7 workouts a week</option>
							<option value={1.9}>Very active — physical job + training</option>
						</select>
					</div>
				</div>
				<div class="mt-6 grid gap-4 text-center sm:grid-cols-3">
					<div class="rounded-lg border border-line bg-panel-2 p-4"><p class="text-xs font-bold tracking-wider text-muted uppercase">Lose fat</p><p class="font-display mt-1 text-2xl font-semibold text-lime">{tdee - 400} kcal</p><p class="mt-0.5 text-xs text-muted">~400 below maintenance</p></div>
					<div class="rounded-lg border border-lime/50 bg-panel-2 p-4"><p class="text-xs font-bold tracking-wider text-muted uppercase">Maintain</p><p class="font-display mt-1 text-2xl font-semibold text-lime">{tdee} kcal</p><p class="mt-0.5 text-xs text-muted">your daily burn</p></div>
					<div class="rounded-lg border border-line bg-panel-2 p-4"><p class="text-xs font-bold tracking-wider text-muted uppercase">Build muscle</p><p class="font-display mt-1 text-2xl font-semibold text-lime">{tdee + 300} kcal</p><p class="mt-0.5 text-xs text-muted">~300 above maintenance</p></div>
				</div>
				<p class="mt-4 text-center text-xs text-muted">Estimates only — a coach fine-tunes them after your assessment. See <a href="/nutrition" class="font-semibold text-lime underline underline-offset-4">Nutrition Coaching</a>.</p>
			</div>
		{:else}
			<div class="card p-6 sm:p-8" use:reveal>
				<h2 class="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-cream uppercase"><Calculator class="h-5 w-5 text-lime" /> One-Rep Max (1RM)</h2>
				<p class="mt-2 text-sm text-muted">Epley formula. Enter a weight you lifted for reps — we estimate your max.</p>
				<div class="mt-6 grid gap-6 sm:grid-cols-2">
					<div>
						<label for="calc-lift" class="label">Weight lifted — {liftWeight} kg</label>
						<input id="calc-lift" type="range" min="20" max="250" step="2.5" bind:value={liftWeight} class="w-full accent-[#b7e332]" aria-label="Weight lifted in kilograms" />
					</div>
					<div>
						<label for="calc-reps" class="label">Reps — {liftReps}</label>
						<input id="calc-reps" type="range" min="1" max="12" step="1" bind:value={liftReps} class="w-full accent-[#b7e332]" aria-label="Repetitions" />
					</div>
				</div>
				<div class="mt-6 rounded-lg border border-line bg-panel-2 p-5 text-center">
					<p class="text-xs font-bold tracking-wider text-muted uppercase">Estimated 1RM</p>
					<p class="font-display mt-1 text-5xl font-semibold text-cream">{oneRm} kg</p>
					<p class="mt-1 text-sm text-muted">{liftWeight} kg × {liftReps} reps</p>
				</div>
				<div class="mt-6">
					<p class="text-center text-xs font-bold tracking-wider text-muted uppercase">Training weights from your 1RM</p>
					<div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
						{#each percentages as p (p.pct)}
							<div class="rounded-lg border border-line bg-panel-2 p-3 text-center"><p class="text-xs font-bold text-lime">{p.pct}%</p><p class="font-display mt-0.5 text-xl font-semibold text-cream">{p.kg} kg</p></div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>
