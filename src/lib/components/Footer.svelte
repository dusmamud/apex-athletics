<script lang="ts">
	import { Mail, MapPin, Phone, Zap } from '@lucide/svelte';
	// Brand icons were removed from Lucide — these three are inline SVGs in the
	// same stroke style as Lucide (24x24, stroke currentColor, stroke-width 2).
	import { coaches, programs } from '#lib/data/gym';
</script>

<footer class="border-t border-line bg-[#08090a]">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
		<div class="min-w-0">
			<a href="/" class="flex items-center gap-2">
				<span class="flex h-9 w-9 items-center justify-center rounded-md bg-lime text-ink">
					<Zap class="h-5 w-5" strokeWidth={2.5} />
				</span>
				<span class="font-display text-xl leading-none font-semibold tracking-wide text-cream uppercase">
					Apex <span class="block text-[0.6rem] font-medium tracking-[0.35em] text-lime">Athletics</span>
				</span>
			</a>
			<p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
				Train with purpose. Get stronger every day. A community built on discipline, coaching and
				real results.
			</p>
			<div class="mt-5 flex gap-2">
				<a
					href="https://instagram.com"
					target="_blank"
					rel="noreferrer"
					aria-label="APEX ATHLETICS on Instagram"
					class="flex h-11 w-11 items-center justify-center rounded-md border border-line text-cream transition hover:border-lime hover:text-lime"
				>
					<span class="sr-only">APEX ATHLETICS on Instagram</span>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
				</a>
				<a
					href="https://facebook.com"
					target="_blank"
					rel="noreferrer"
					aria-label="APEX ATHLETICS on Facebook"
					class="flex h-11 w-11 items-center justify-center rounded-md border border-line text-cream transition hover:border-lime hover:text-lime"
				>
					<span class="sr-only">APEX ATHLETICS on Facebook</span>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
				</a>
				<a
					href="https://youtube.com"
					target="_blank"
					rel="noreferrer"
					aria-label="APEX ATHLETICS on YouTube"
					class="flex h-11 w-11 items-center justify-center rounded-md border border-line text-cream transition hover:border-lime hover:text-lime"
				>
					<span class="sr-only">APEX ATHLETICS on YouTube</span>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
				</a>
			</div>
		</div>

		<nav aria-label="Quick links" class="min-w-0">
			<!-- Footer headings are h2 (same visual size): on pages with only an h1
			     above the footer, h3 would skip a heading level. -->
			<h2 class="font-display text-sm font-semibold tracking-[0.2em] text-cream uppercase">Quick Links</h2>
			<ul class="mt-4 space-y-1">
				{#each [{ href: '/about', label: 'About Us' }, { href: '/schedule', label: 'Class Schedule' }, { href: '/classes', label: 'Classes by Goal' }, { href: '/facilities', label: 'Facilities' }, { href: '/gallery', label: 'Photo Gallery' }, { href: '/location', label: 'Location & Hours' }, { href: '/success-stories', label: 'Success Stories' }, { href: '/bmi-calculator', label: 'BMI Calculator' }, { href: '/calculators', label: 'Fitness Calculators' }, { href: '/nutrition', label: 'Nutrition Coaching' }, { href: '/corporate-wellness', label: 'Corporate Wellness' }, { href: '/challenges', label: '30-Day Challenge' }, { href: '/events', label: 'Events' }, { href: '/careers', label: 'Careers' }, { href: '/free-trial', label: 'Free Trial' }, { href: '/book-a-tour', label: 'Book a Tour' }, { href: '/member-login', label: 'Member Login' }, { href: '/blog', label: 'Blog' }, { href: '/faq', label: 'FAQ' }, { href: '/join', label: 'Join the Gym' }, { href: '/contact', label: 'Contact' }] as item (item.href)}
					<li>
						<a
							href={item.href}
							class="inline-flex min-h-8 items-center text-sm text-muted transition hover:text-lime"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Programs" class="min-w-0">
			<h2 class="font-display text-sm font-semibold tracking-[0.2em] text-cream uppercase">Programs</h2>
			<ul class="mt-4 space-y-1">
				{#each programs as program (program.slug)}
					<li>
						<a
							href="/programs/{program.slug}"
							class="inline-flex min-h-8 items-center text-sm text-muted transition hover:text-lime"
						>
							{program.name}
						</a>
					</li>
				{/each}
				{#each coaches as coach (coach.slug)}
					<li>
						<a
							href="/coaches/{coach.slug}"
							class="inline-flex min-h-8 items-center text-sm text-muted transition hover:text-lime"
						>
							Coach {coach.name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="min-w-0">
			<h2 class="font-display text-sm font-semibold tracking-[0.2em] text-cream uppercase">Contact</h2>
			<ul class="mt-4 space-y-3 text-sm text-muted">
				<!-- Demo contact details — replace with the real gym address, phone and email before launch. -->
				<li class="flex items-start gap-2">
					<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-lime" />
					<span>48 Ironworks Avenue, Downtown, New York, NY 10001</span>
				</li>
				<li class="flex items-center gap-2">
					<Phone class="h-4 w-4 shrink-0 text-lime" />
					<a href="tel:+12125550148" class="transition hover:text-lime">+1 (212) 555-0148</a>
				</li>
				<li class="flex items-center gap-2">
					<Mail class="h-4 w-4 shrink-0 text-lime" />
					<a href="mailto:train@apexathletics.com" class="transition hover:text-lime"
						>train@apexathletics.com</a
					>
				</li>
			</ul>
			<p class="mt-4 text-xs leading-relaxed text-muted/80">
				Open Mon–Sat, 5:00 AM – 10:00 PM. Sunday 7:00 AM – 8:00 PM.
			</p>
		</div>
	</div>

	<div class="border-t border-line">
		<div
			class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6 lg:px-8"
		>
			<p>© 2026 APEX ATHLETICS. All rights reserved.</p>
			<div class="flex items-center gap-4">
				<a href="/privacy-policy" class="transition hover:text-lime">Privacy Policy</a>
				<a href="/terms" class="transition hover:text-lime">Terms of Service</a>
				<a href="/cookie-policy" class="transition hover:text-lime">Cookie Policy</a>
				<a href="/sitemap" class="transition hover:text-lime">Sitemap</a>
			</div>
		</div>
	</div>
</footer>
