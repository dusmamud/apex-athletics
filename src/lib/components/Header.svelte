<script lang="ts">
	import { Menu, X, Zap } from '@lucide/svelte';

	const links = [
		{ href: '/programs', label: 'Programs' },
		{ href: '/coaches', label: 'Coaches' },
		{ href: '/membership', label: 'Membership' },
		{ href: '/schedule', label: 'Schedule' },
		{ href: '/about', label: 'About' }
	];

	let open = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 8;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header
	class="sticky top-0 z-50 border-b bg-ink/95 backdrop-blur transition-shadow duration-300 {scrolled
		? 'border-line shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
		: 'border-transparent'}"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
		<a href="/" class="flex min-h-11 items-center gap-2" aria-label="APEX ATHLETICS — home">
			<span class="flex h-9 w-9 items-center justify-center rounded-md bg-lime text-ink">
				<Zap class="h-5 w-5" strokeWidth={2.5} />
			</span>
			<span class="font-display text-xl leading-none font-semibold tracking-wide text-cream uppercase">
				Apex <span class="block text-[0.6rem] font-medium tracking-[0.35em] text-lime">Athletics</span>
			</span>
		</a>

		<nav aria-label="Primary" class="hidden items-center gap-1 lg:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-md px-3 py-2 text-sm font-medium text-cream/85 transition hover:bg-panel hover:text-lime"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<a href="/join" class="btn-lime hidden !min-h-10 !px-4 !py-2 sm:inline-flex">Join the Gym</a>
			<button
				type="button"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				onclick={() => (open = !open)}
				class="flex h-11 w-11 items-center justify-center rounded-md border border-line text-cream transition hover:border-lime hover:text-lime lg:hidden"
			>
				{#if open}
					<X class="h-5 w-5" />
				{:else}
					<Menu class="h-5 w-5" />
				{/if}
			</button>
		</div>
	</div>

	{#if open}
		<nav aria-label="Mobile" class="border-t border-line bg-ink px-4 pt-2 pb-4 lg:hidden">
			{#each links as link (link.href)}
				<a
					href={link.href}
					onclick={() => (open = false)}
					class="flex min-h-12 items-center rounded-md px-3 text-base font-medium text-cream transition hover:bg-panel hover:text-lime"
				>
					{link.label}
				</a>
			{/each}
			<a href="/join" onclick={() => (open = false)} class="btn-lime mt-3 w-full">Join the Gym</a>
			<a href="/contact" onclick={() => (open = false)} class="btn-ghost mt-2 w-full">Contact Us</a>
		</nav>
	{/if}
</header>
