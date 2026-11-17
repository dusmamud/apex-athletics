import { error } from '@sveltejs/kit';
import { programs } from '#lib/data/gym';
import type { PageLoad } from './$types';

export const entries = () => programs.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const program = programs.find((p) => p.slug === params.slug);
	if (!program) error(404, 'Program not found');
	return { program, related: programs.filter((p) => p.slug !== params.slug) };
};
