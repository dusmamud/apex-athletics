<script lang="ts">
	import { Dumbbell, HeartHandshake, Target, Users } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import CountUp from '#lib/components/CountUp.svelte';
	import { coaches, IMAGES } from '#lib/data/gym';

	const values = [
		{
			icon: Target,
			title: 'Discipline over motivation',
			text: 'Motivation fades. Systems do not. We build training around habits you can keep on your worst week, not just your best.'
		},
		{
			icon: Users,
			title: 'Community first',
			text: 'Nobody trains alone here. Classes, challenges and coaches who know your name — that is what keeps people coming back for years.'
		},
		{
			icon: Dumbbell,
			title: 'Coaching, not just equipment',
			text: 'A gym full of machines is not a program. Every member gets structure, feedback and a plan that adapts as they improve.'
		},
		{
			icon: HeartHandshake,
			title: 'Every body welcome',
			text: 'First-timers, athletes, parents, over-50s — if you want to get stronger, there is a place for you on this floor.'
		}
	];
</script>

<svelte:head>
	<title>About APEX ATHLETICS — Our Story, Values & Team</title>
	<meta
		name="description"
		content="APEX ATHLETICS has helped New York train with purpose for over 15 years. Meet the team, our values and the gym behind 2,400+ members."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
		<div class="min-w-0" use:reveal={{ variant: 'left' }}>
			<p class="eyebrow">Our story</p>
			<h1 class="section-title mt-2">Built by Discipline</h1>
			<p class="mt-4 leading-relaxed text-muted">
				APEX ATHLETICS started in 2011 as a single room, six barbells and a simple idea: most
				gyms sell access, but what people actually need is coaching.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				Fifteen years later we are 2,400 members strong, with a team of 12 coaches, four
				structured programs and a floor that is busy from 5:00 AM to 10:00 PM. The idea has not
				changed: show up, follow the plan, and let the results compound.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				We are not a luxury spa and we are not a budget warehouse. We are a training gym — chalk,
				barbells, honest coaching and a community that notices when you are gone.
			</p>
		</div>
		<div class="min-w-0 overflow-hidden rounded-2xl border border-line" use:reveal={{ variant: 'right' }}>
			<img
				src={IMAGES.about}
				alt="Inside the APEX ATHLETICS gym"
				width="1400"
				height="933"
				loading="lazy"
				class="aspect-[3/2] w-full object-cover"
			/>
		</div>
	</div>

	<dl class="mt-14 grid grid-cols-2 gap-4 border-y border-line py-8 text-center lg:grid-cols-4">
		<div class="min-w-0">
			<dd class="font-display text-4xl font-semibold text-lime"><CountUp value={15} suffix="+" /></dd>
			<dt class="mt-1 text-xs font-semibold tracking-wider text-muted uppercase">Years strong</dt>
		</div>
		<div class="min-w-0">
			<dd class="font-display text-4xl font-semibold text-lime"><CountUp value={2400} suffix="+" /></dd>
			<dt class="mt-1 text-xs font-semibold tracking-wider text-muted uppercase">Active members</dt>
		</div>
		<div class="min-w-0">
			<dd class="font-display text-4xl font-semibold text-lime"><CountUp value={12} suffix="+" /></dd>
			<dt class="mt-1 text-xs font-semibold tracking-wider text-muted uppercase">Expert coaches</dt>
		</div>
		<div class="min-w-0">
			<dd class="font-display text-4xl font-semibold text-lime"><CountUp value={18000} suffix="+" /></dd>
			<dt class="mt-1 text-xs font-semibold tracking-wider text-muted uppercase">Sessions coached / year</dt>
		</div>
	</dl>

	<div class="mt-14">
		<h2 class="section-title text-center" use:reveal>What we believe</h2>
		<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each values as value, i (value.title)}
				<div class="card min-w-0 p-6" use:reveal={{ delay: i * 70 }}>
					<span class="flex h-12 w-12 items-center justify-center rounded-lg bg-lime/15 text-lime">
						<value.icon class="h-6 w-6" />
					</span>
					<h3 class="font-display mt-4 text-lg font-semibold tracking-wide text-cream uppercase">{value.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-14" use:reveal>
		<h2 class="section-title text-center">The coaches behind it</h2>
		<div class="mt-10 grid gap-5 sm:grid-cols-3">
			{#each coaches as coach (coach.slug)}
				<a href="/coaches/{coach.slug}" class="card group block min-w-0 overflow-hidden">
					<img src={coach.image} alt="Coach {coach.name}" width="1000" height="1000" loading="lazy" class="aspect-[4/3] w-full object-cover object-top transition duration-500 group-hover:scale-105" />
					<div class="p-5">
						<h3 class="font-display text-xl font-semibold tracking-wide text-cream uppercase group-hover:text-lime">{coach.name}</h3>
						<p class="mt-1 text-sm text-lime">{coach.role}</p>
					</div>
				</a>
			{/each}
		</div>
		<div class="mt-10 text-center">
			<a href="/join" class="btn-lime">Join APEX ATHLETICS</a>
		</div>
	</div>
</section>
