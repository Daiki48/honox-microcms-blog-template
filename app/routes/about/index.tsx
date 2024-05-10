import { css } from 'hono/css';
import { createRoute } from 'honox/factory';

import { convertToHtml } from '../../lib/markdownToHtml';

export default createRoute(async (c) => {
	const html = await convertToHtml('./contents/routes/about/myself.md');
	return c.render(
		<div class={aboutContainerClass}>
			<div class={aboutClass} dangerouslySetInnerHTML={{ __html: html }} />
		</div>,
		{ title: 'About' }
	);
});

const aboutContainerClass = css`
	display: flex;
	font-family: sans-serif;
	line-height: 3;
	@media (max-width: 1320px) {
		line-height: 2;
		margin: 0;
		padding: 0;
		font-size: 16px;
	}
`;

const aboutClass = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 80%;
	padding: 2rem;
	margin: auto;
	word-wrap: break-word;
	@media (max-width: 1320px) {
		margin: 0.2rem;
		padding: 0.4rem;
		width: 100%;
	}
`;
