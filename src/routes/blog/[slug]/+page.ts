import { error } from '@sveltejs/kit';
import { blogPosts } from '#lib/data/gym';
import type { PageLoad } from './$types';

export const entries = () => blogPosts.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const post = blogPosts.find((p) => p.slug === params.slug);
	if (!post) error(404, 'Post not found');
	return { post, others: blogPosts.filter((p) => p.slug !== params.slug) };
};
