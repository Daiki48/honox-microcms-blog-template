import { css } from 'hono/css';
import { createRoute } from 'honox/factory';

import { getArticles, type Article } from '../../lib/microcms';

export default createRoute(async (c) => {
	const response = await getArticles();
	let tagMap = new Map();
	response.contents.forEach((article: Article) => {
		if (article.tag && article.tag.length > 0) {
			article.tag.forEach((tag) => {
				if (tag.trim() !== '') {
					tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
				}
			});
		}
	});

	return c.render(
		<div class={tagsContainerClass}>
			<h1 class={tagsHeaderClass}>Tags</h1>
			<ul class={tagsListClass}>
				{Array.from(tagMap).map(([tag, count]) => (
					<a href={`/tags/${tag}`}>
						<li class={tagClass}>
							{tag} <span class={tagCountClass}>{count}</span>
						</li>
					</a>
				))}
			</ul>
		</div>,
		{ title: 'Tags' }
	);
});

const tagCountClass = css`
	color: rgba(255, 99, 71, 0.8);
`;

const tagClass = css`
	margin: 0.4rem 0.2rem;
	padding: 0.4rem;
	list-style: none;
	background-color: rgba(211, 211, 211, 0.5);
	border-radius: 10px;
	font-size: 16px;
	color: rgba(105, 105, 105, 1);
	&:hover {
		background-color: rgba(211, 211, 211, 1);
	}
`;

const tagsListClass = css`
	display: grid;
	gap: 0.6rem;
	grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`;

const tagsHeaderClass = css`
	display: flex;
	justify-content: center;
`;

const tagsContainerClass = css`
	font-family: sans-serif;
	width: 80%;
	margin: 0 auto;
`;
