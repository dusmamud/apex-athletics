import { error } from '@sveltejs/kit';
import { coaches, programs } from '#lib/data/gym';
import type { PageLoad } from './$types';

export const entries = () => coaches.map((c) => ({ slug: c.slug }));

export const load: PageLoad = ({ params }) => {
	const coach = coaches.find((c) => c.slug === params.slug);
	if (!coach) error(404, 'Coach not found');
	const coachPrograms = programs.filter((p) => p.coach === coach.name);
	return { coach, coachPrograms, others: coaches.filter((c) => c.slug !== params.slug) };
};
