import { css } from 'hono/css';
import { createRoute } from 'honox/factory';
import { getArticles, getArticlesByTag, type Article } from '../../../lib/microcms';
import { jstFromUtcDate } from '../../../lib/formatDate';
import Pagenation from '../../../islands/pagenation';

export default createRoute(async (c) => {
	const { tag } = c.req.param();
	const response = await getArticles();
	const articles: Article[] = await getArticlesByTag(response, tag);

	if (!articles.length) {
		return c.notFound();
	}

	return c.render(
		<div class={tagsContainerClass}>
			<h1 class={tagsHeaderClass}>{tag}の記事</h1>
			{articles.length > 0 ? (
				<ul class={tagsListClass}>
					{articles.map((article) => (
						<li class={tagsClass}>
							<div class={imgClass}>
								{article.eyecatch ? (
									<img src={article.eyecatch.url} alt="eyecatch" width="50px" height="auto" />
								) : (
									<img
										src="/static/honox-blog-template-icon.webp"
										alt="eyecatch"
										width="50px"
										height="auto"
									/>
								)}
							</div>
							<div class={blogMetaClass}>
								<a href={`/blog/${article.id}`} class={titleClass}>
									{article.title.length > 20 ? `${article.title.slice(0, 20)}...` : article.title}
								</a>
								<ul class={tagListClass}>
									{article.tag
										? article.tag.map((tag) => (
												<a href={`/tags/${tag}`}>
													<li class={tagClass}>{tag}</li>
												</a>
											))
										: null}
								</ul>
								<div class={blogMetaFooterClass}>
									<span class={categoryClass}>{article.category}</span>
									<time class={publishedDateClass}>{jstFromUtcDate(article.publishedAt)}</time>
								</div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p class={notContentClass}>コンテンツが存在しません</p>
			)}
			<Pagenation path={`tags/${tag}/pages`} totalCount={articles.length} limit={10} />
		</div>,
		{ title: `${tag}を選択中` }
	);
});

const notContentClass = css`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 2rem;
`;

const tagClass = css`
	margin: 0.4rem 0.2rem;
	padding: 0.4rem;
	list-style: none;
	background-color: rgba(211, 211, 211, 0.5);
	border-radius: 10px;
	font-size: 10px;
	color: rgba(105, 105, 105, 1);
	&:hover {
		background-color: rgba(211, 211, 211, 1);
	}
`;

const tagListClass = css`
	display: flex;
	@media (max-width: 800px) {
		font-size: 10px;
	}
`;

const publishedDateClass = css`
	font-size: 12px;
	@media (max-width: 800px) {
		font-size: 10px;
	}
`;

const categoryClass = css`
	font-size: 14px;
	@media (max-width: 800px) {
		font-size: 10px;
	}
`;

const titleClass = css`
	font-size: 20px;
	color: rgb(112, 128, 144);
	width: 300px;
	&:hover {
		color: rgb(105, 105, 105);
	}
	@media (max-width: 800px) {
		font-size: 16px;
		width: 220px;
	}
`;

const blogMetaFooterClass = css`
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	align-items: center;
	width: 300px;
	@media (max-width: 800px) {
		width: 220px;
	}
`;

const blogMetaClass = css`
	display: flex;
	flex-direction: column;
`;

const imgClass = css`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.6rem;
	margin: 1rem;
	background-color: rgb(220, 220, 220);
	border-radius: 10px;
	box-shadow: 0 0 4px rgb(192, 192, 192);
	img {
		border-radius: 8px;
	}
	@media (max-width: 800px) {
		padding: 0.4rem;
		margin: 0.2rem;
	}
`;

const tagsClass = css`
	display: flex;
	margin: 1rem;
	justify-content: start;
	align-items: center;
`;

const tagsListClass = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	gap: 1.4rem;
	justify-items: center;
	padding: 0;
	margin: 0;
`;

const tagsHeaderClass = css`
	display: flex;
	justify-content: center;
`;

const tagsContainerClass = css`
	font-family: sans-serif;
	width: 90%;
	margin: 0 auto;
	@media (max-width: 800px) {
		width: 100%;
		font-size: 10px;
		padding: 0;
		margin: 0;
	}
`;
