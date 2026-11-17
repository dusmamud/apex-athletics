<script lang="ts">
	import { ArrowRight, ArrowUpRight, Play, Star, TrendingUp } from '@lucide/svelte';
	import { reveal } from '#lib/reveal';
	import CountUp from '#lib/components/CountUp.svelte';
	import PlanCard from '#lib/components/PlanCard.svelte';
	import { coaches, IMAGES, plans, programs, testimonials } from '#lib/data/gym';

	const marquee = ['Strength', 'HIIT', 'Conditioning', 'Community', 'Discipline', 'Results'];
</script>

<svelte:head>
	<title>APEX ATHLETICS — Built by Discipline | Gym, Strength, HIIT & Personal Training</title>
	<meta
		name="description"
		content="Train with purpose. Get stronger every day. Strength training, personal training, HIIT and conditioning with expert coaches at APEX ATHLETICS."
	/>
</svelte:head>

<!-- ================= HERO ================= -->
<section class="mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-14 lg:pb-16">
	<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
		<div class="relative min-w-0 overflow-hidden rounded-2xl border border-line">
			<img
				src={IMAGES.hero}
				alt="Athlete performing a kettlebell swing in the APEX ATHLETICS gym"
				width="1600"
				height="1067"
				fetchpriority="high"
				class="aspect-[4/3] w-full object-cover object-top sm:aspect-[16/11] lg:aspect-[4/3.4]"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"></div>
			<div
				class="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-ink/70 px-3 py-2 text-xs font-semibold text-cream backdrop-blur"
			>
				<span class="h-2 w-2 rounded-full bg-lime"></span> Open now · 5:00 AM – 10:00 PM
			</div>
		</div>

		<div class="min-w-0">
			<p class="eyebrow">APEX ATHLETICS — New York</p>
			<h1
				class="font-display mt-3 text-[3.4rem] leading-[0.95] font-semibold tracking-wide text-cream uppercase sm:text-7xl lg:text-[5.2rem]"
			>
				Built by<br /><span class="text-lime">Discipline</span>
			</h1>
			<p class="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
				Train with purpose. Get stronger every day. Expert coaching, structured programs and a
				community that shows up — so you do too.
			</p>
			<div class="mt-7 flex flex-wrap items-center gap-3">
				<a href="/membership" class="btn-lime">
					Explore Memberships <ArrowRight class="h-4 w-4" />
				</a>
				<a href="/success-stories" class="btn-ghost">
					<Play class="h-4 w-4 fill-current" /> Watch Video
				</a>
			</div>

			<dl class="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4">
				<div class="min-w-0">
					<dt class="text-xs font-semibold tracking-wider text-muted uppercase">Coaches</dt>
					<dd class="font-display mt-1 text-3xl font-semibold text-cream">
						<CountUp value={12} suffix="+" />
					</dd>
				</div>
				<div class="min-w-0">
					<dt class="text-xs font-semibold tracking-wider text-muted uppercase">Members</dt>
					<dd class="font-display mt-1 text-3xl font-semibold text-cream">
						<CountUp value={2400} suffix="+" />
					</dd>
				</div>
				<div class="min-w-0">
					<dt class="text-xs font-semibold tracking-wider text-muted uppercase">Member rating</dt>
					<dd class="font-display mt-1 text-3xl font-semibold text-cream">
						<CountUp value={4.9} decimals={1} suffix="/5" />
					</dd>
				</div>
				<div class="min-w-0">
					<dt class="text-xs font-semibold tracking-wider text-muted uppercase">Years strong</dt>
					<dd class="font-display mt-1 text-3xl font-semibold text-cream">
						<CountUp value={15} suffix="+" />
					</dd>
				</div>
			</dl>
		</div>
	</div>
</section>

<!-- ================= MARQUEE ================= -->
<div class="overflow-hidden border-y border-line bg-panel py-3" aria-hidden="true">
	<div class="flex w-max animate-marquee gap-0 hover:[animation-play-state:paused]">
		{#each [...marquee, ...marquee, ...marquee, ...marquee] as word, i (i)}
			<span
				class="font-display flex items-center gap-6 pr-6 text-lg font-semibold tracking-[0.2em] whitespace-nowrap text-cream/70 uppercase"
			>
				{word} <span class="text-lime">•</span>
			</span>
		{/each}
	</div>
</div>

<!-- ================= PROGRAMS ================= -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<div class="text-center" use:reveal>
		<p class="eyebrow">What we do</p>
		<h2 class="section-title mt-2">Training Programs</h2>
		<p class="mx-auto mt-3 max-w-xl text-muted">
			Four programs, one goal — measurable progress. Pick your path and a coach will meet you
			where you are.
		</p>
	</div>
	<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each programs as program, i (program.slug)}
			<article class="card flex min-w-0 flex-col overflow-hidden" use:reveal={{ delay: i * 70 }}>
				<div class="overflow-hidden">
					<img
						src={program.image}
						alt="{program.name} at APEX ATHLETICS"
						width="1200"
						height="800"
						loading="lazy"
						class="aspect-[3/2] w-full object-cover transition duration-500 hover:scale-105"
					/>
				</div>
				<div class="flex flex-1 flex-col p-5">
					<h3 class="font-display text-xl font-semibold tracking-wide text-cream uppercase">
						{program.name}
					</h3>
					<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{program.description}</p>
					<p class="mt-3 text-xs font-semibold text-lime">
						{program.duration} · {program.level} · {program.calories}
					</p>
					<a
						href="/programs/{program.slug}"
						class="btn-lime mt-4 w-full !py-2.5 text-xs"
						aria-label="Learn more about {program.name}"
					>
						Learn More
					</a>
				</div>
			</article>
		{/each}
	</div>
	<div class="mt-8 text-center" use:reveal>
		<a href="/programs" class="btn-ghost">View All Programs <ArrowUpRight class="h-4 w-4" /></a>
	</div>
</section>

<!-- ================= COACHES ================= -->
<section class="border-y border-line bg-panel/60">
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
		<div class="text-center" use:reveal>
			<p class="eyebrow">The team</p>
			<h2 class="section-title mt-2">Meet Our Coaches</h2>
			<p class="mx-auto mt-3 max-w-xl text-muted">
				Certified, experienced and genuinely invested in your progress.
			</p>
		</div>
		<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each coaches as coach, i (coach.slug)}
				<a
					href="/coaches/{coach.slug}"
					class="card group block min-w-0 overflow-hidden"
					use:reveal={{ delay: i * 70 }}
					aria-label="Meet {coach.name}, {coach.role}"
				>
					<div class="overflow-hidden">
						<img
							src={coach.image}
							alt="Coach {coach.name}"
							width="1000"
							height="1000"
							loading="lazy"
							class="aspect-[4/3] w-full object-cover object-top transition duration-500 group-hover:scale-105"
						/>
					</div>
					<div class="p-5">
						<h3
							class="font-display text-xl font-semibold tracking-wide text-cream uppercase group-hover:text-lime"
						>
							{coach.name}
						</h3>
						<p class="mt-1 text-sm font-medium text-lime">{coach.role}</p>
						<p class="mt-1 text-xs text-muted">{coach.credentials} · {coach.experience}</p>
					</div>
				</a>
			{/each}
		</div>
		<div class="mt-8 text-center" use:reveal>
			<a href="/coaches" class="btn-ghost">Meet All Coaches <ArrowUpRight class="h-4 w-4" /></a>
		</div>
	</div>
</section>

<!-- ================= RESULTS ================= -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
		<div class="min-w-0 overflow-hidden rounded-2xl border border-line" use:reveal={{ variant: 'left' }}>
			<img
				src={IMAGES.community}
				alt="Members training together in a group class at APEX ATHLETICS"
				width="1400"
				height="933"
				loading="lazy"
				class="aspect-[3/2] w-full object-cover"
			/>
		</div>
		<div class="min-w-0" use:reveal={{ variant: 'right' }}>
			<p class="eyebrow">Real results, real people</p>
			<h2 class="section-title mt-2">Your Transformation Starts Here</h2>
			<p class="mt-4 leading-relaxed text-muted">
				Join a community dedicated to pushing boundaries. Find your program, work with expert
				coaches and track real progress — every step of the way.
			</p>
			<div class="card mt-6 flex items-center gap-4 p-5">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-lime/15 text-lime">
					<TrendingUp class="h-6 w-6" />
				</span>
				<div class="min-w-0">
					<p class="text-sm font-semibold text-cream">Average member result, first 12 weeks</p>
					<p class="mt-0.5 text-sm text-muted">
						<CountUp value={6} suffix=" kg" class="font-semibold text-lime" /> average fat loss ·
						<CountUp value={24} suffix="%" class="font-semibold text-lime" /> average strength gain
					</p>
				</div>
			</div>
			<a href="/success-stories" class="btn-lime mt-7">See Success Stories</a>
		</div>
	</div>
</section>

<!-- ================= MEMBERSHIP ================= -->
<section class="border-y border-line bg-panel/60">
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
		<div class="text-center" use:reveal>
			<p class="eyebrow">Join us</p>
			<h2 class="section-title mt-2">Membership Plans</h2>
			<p class="mx-auto mt-3 max-w-xl text-muted">
				No joining fee. No lock-in on monthly plans. Cancel with 30 days notice.
			</p>
		</div>
		<div class="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
			{#each plans as plan, i (plan.name)}
				<div use:reveal={{ delay: i * 70 }} class="min-w-0">
					<PlanCard {plan} billing="monthly" />
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center" use:reveal>
			<a href="/membership" class="btn-ghost">Compare Plans & Save Yearly</a>
		</div>
	</div>
</section>

<!-- ================= TESTIMONIALS ================= -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<div class="text-center" use:reveal>
		<p class="eyebrow">Members say it best</p>
		<h2 class="section-title mt-2">Member Testimonials</h2>
	</div>
	<div class="mt-10 grid gap-5 md:grid-cols-3">
		{#each testimonials as t, i (t.name)}
			<figure class="card min-w-0 p-6" use:reveal={{ delay: i * 70 }}>
				<div class="flex gap-0.5" aria-label="5 out of 5 stars">
					{#each Array(5) as _, s (s)}
						<Star class="h-4 w-4 fill-gold text-gold" />
					{/each}
				</div>
				<blockquote class="mt-4 text-sm leading-relaxed text-cream/90">“{t.quote}”</blockquote>
				<figcaption class="mt-5 flex items-center gap-3">
					<span
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-ink"
						aria-hidden="true">{t.initials}</span
					>
					<span class="min-w-0">
						<span class="block text-sm font-semibold text-cream">{t.name}</span>
						<span class="block text-xs text-muted">{t.detail} · {t.program}</span>
					</span>
				</figcaption>
			</figure>
		{/each}
	</div>
</section>

<!-- ================= CTA ================= -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
	<div
		class="relative overflow-hidden rounded-2xl border border-lime/40 bg-panel px-6 py-14 text-center sm:px-12"
		use:reveal
	>
		<p class="eyebrow">No card required</p>
		<h2 class="section-title mx-auto mt-2 max-w-2xl">Start Your Next Chapter</h2>
		<p class="mx-auto mt-3 max-w-xl text-muted">
			Unlock your potential with APEX ATHLETICS. Join today and experience the difference — 7
			days free, full access, zero pressure.
		</p>
		<a href="/join" class="btn-lime mt-7">Claim Your Free Trial</a>
	</div>
</section>
