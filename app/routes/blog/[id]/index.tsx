import { css } from 'hono/css';
import { createRoute } from 'honox/factory';
import { getArticles, getArticleById } from '../../../lib/microcms';
import { jstFromUtcDateTime } from '../../../lib/formatDate';
import Toc from '../../../islands/toc';
import ParsedHtml from '../../../islands/parsedHtml';

export default createRoute(async (c) => {
	const { id } = c.req.param();
const response = await getArticles();
	const article = await getArticleById(response, id);

	if (!article) {
		return c.notFound();
	}

	return c.render(
		<div>
			<div class={headClass}>
				{article.eyecatch ? (
					<img src={article.eyecatch.url} alt="eyecatch" width="300px" height="auto" />
				) : (
					<img src="/static/honox-blog-template-icon.webp" alt="eyecatch" width="300px" height="auto" />
				)}
				<h1 class={titleClass}>{article.title}</h1>
				<p class={categoryClass}>{article.category}</p>
				<ul class={tagListClass}>
					{article.tag ? (
						article.tag.map((tag) => (
							<a href={`/tags/${tag}`}>
								<li class={tagClass}>{tag}</li>
							</a>
						))
					) : (
						<li></li>
					)}
				</ul>
				<div>公開日 : {jstFromUtcDateTime(article.publishedAt)}</div>
				<p class={descriptionClass}>{article.description}</p>
			</div>
			<section class={articleMainClass}>
				<div class={articleMainContentClass}>
					{article.content ? <ParsedHtml content={article.content} /> : <p>Not found content...</p>}
				</div>
				<div class={articleTocClass}>
					<Toc content={article.content} />
				</div>
			</section>
		</div>,
		{ title: article.title }
	);
});

const tagClass = css`
	margin: 0.4rem 1rem;
	padding: 0.4rem 1rem;
	list-style: none;
	background-color: rgba(211, 211, 211, 0.5);
	border-radius: 10px;
	color: rgba(105, 105, 105, 1);
	&:hover {
		background-color: rgba(211, 211, 211, 1);
	}
`;

const tagListClass = css`
	display: flex;
`;

const descriptionClass = css`
	margin: 1rem;
	width: 80%;
	@media (max-width: 800px) {
		width: 100%;
	}
`;

const categoryClass = css`
	margin: 1rem;
	border-bottom: 1px solid rgba(192, 192, 192, 0.9);
	font-size: 18px;
`;

const articleMainClass = css`
	display: flex;
	justify-content: center;
	height: auto;
	@media (max-width: 800px) {
		flex-direction: column-reverse;
	}
`;

const articleTocClass = css`
	background-color: rgba(220, 220, 220, 0.2);
	display: flex;
	flex: 0 2 30%;
	position: sticky;
	position: --webkit-sticky;
	top: 20px;
	height: 50vh;
	overflow: auto;
	border-radius: 6px;
	border-left: 4px solid rgb(192, 192, 192);
	@media (max-width: 800px) {
		position: unset;
		margin-bottom: 2rem;
	}
`;

const articleMainContentClass = css`
	flex: 0 1 80%;
	a {
		color: rgba(255, 255, 244, 12, 1);
	}
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
