import { css } from 'hono/css';
import { createRoute } from 'honox/factory';
import { getNews, getNewsById } from '../../../lib/microcms';
import { jstFromUtcDateTime } from '../../../lib/formatDate';
import Toc from '../../../islands/toc';
import ParsedHtml from '../../../islands/parsedHtml';

export default createRoute(async (c) => {
	const { id } = c.req.param();
	const response = await getNews();
	const news = await getNewsById(response, id);

	if (!news) {
		return c.notFound();
	}

	return c.render(
		<div>
			<div class={headClass}>
				{news.eyecatch ? (
					<img src={news.eyecatch.url} alt="eyecatch" width="300px" height="auto" />
				) : (
					<img src="/static/honox-blog-template-icon.webp" alt="eyecatch" width="300px" height="auto" />
				)}
				<h1 class={titleClass}>{news.title}</h1>
				<p class={newsClass}>お知らせ</p>
				<div>公開日 : {jstFromUtcDateTime(news.publishedAt)}</div>
				<p class={descriptionClass}>{news.description}</p>
			</div>
			<section class={newsMainClass}>
				<div class={newsMainContentClass}>
					{news.content ? <ParsedHtml content={news.content} /> : <p>Not found content...</p>}
				</div>
				<div class={newsTocClass}>
					<Toc content={news.content} />
				</div>
			</section>
		</div>,
		{ title: news.title }
	);
});

const newsClass = css`
	margin: 1rem;
	border-bottom: 1px solid rgba(192, 192, 192, 0.9);
	font-size: 18px;
`;

const descriptionClass = css`
	margin: 1rem;
	width: 80%;
	@media (max-width: 800px) {
		width: 100%;
	}
`;

const newsMainClass = css`
	display: flex;
	justify-content: center;
	height: auto;
	@media (max-width: 800px) {
		flex-direction: column-reverse;
	}
`;

const newsTocClass = css`
	background-color: rgba(220, 220, 220, 0.2);
	display: flex;
	flex: 0 2 30%;
	position: sticky;
	position: --webkit-sticky;
	top: 6rem;
	height: 50vh;
	overflow: auto;
	border-radius: 6px;
	border-left: 4px solid rgb(192, 192, 192);
	@media (max-width: 800px) {
		position: unset;
		margin-bottom: 2rem;
	}
`;

const newsMainContentClass = css`
	flex: 0 1 80%;
	a {
		color: rgba(255, 255, 244, 12, 1);
	}
	font-size: 16px;
`;

const headClass = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 2rem;
`;

const titleClass = css`
	padding: 1rem;
`;
