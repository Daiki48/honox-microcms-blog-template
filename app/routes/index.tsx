import { css } from 'hono/css';
import { createRoute } from 'honox/factory';
import { ogpTop } from '../lib/seo';

export default createRoute((c) => {
	return c.render(
		<div class={container}>
			<div class={titleClass}>
				<h1>{ogpTop.title}へようこそ</h1>
			</div>
			<div class={imgContainerClass}>
				<img src="/static/honox-blog-template-icon.png" alt="icon" width="400px" class={imgClass} />
			</div>
			<div class={linksClass}>
				<a href="/about" class={aboutLinkClass}>
					私について
				</a>
				<a href="/blog" class={blogLinkClass}>
					Blog
				</a>
			</div>
		</div>,
		{ title: 'Home' }
	);
});

const blogLinkClass = css`
	margin: 1rem;
	padding: 0.7rem;
	text-decoration: none;
	color: rgba(105, 105, 105, 1);
	background-color: rgba(119, 136, 153, 0.4);
	border-radius: 4px;
	&:hover {
		color: rgba(240, 248, 255, 1);
		background-color: rgba(119, 136, 153, 1);
		box-shadow: 0 0 8px gray;
	}
`;

const aboutLinkClass = css`
	margin: 1rem;
	padding: 0.7rem;
	text-decoration: none;
	color: rgba(105, 105, 105, 1);
	background-color: rgba(119, 136, 153, 0.4);
	border-radius: 4px;
	&:hover {
		color: rgba(240, 248, 255, 1);
		background-color: rgba(119, 136, 153, 1);
		box-shadow: 0 0 8px gray;
	}
`;

const linksClass = css`
	display: flex;
	justify-content: center;
	margin: 1rem;
`;

const titleClass = css`
	display: flex;
	justify-content: center;
`;

const container = css`
	font-family: sans-serif;
`;

const imgContainerClass = css`
	display: flex;
	justify-content: center;
`;

const imgClass = css`
	border-radius: 4px;
	margin: 4px;
	align-items: center;
`;
