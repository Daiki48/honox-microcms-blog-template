import { css } from 'hono/css';
import { createRoute } from 'honox/factory';

import { getArticles, type Article } from '../../lib/microcms';
import { jstFromUtcDate } from '../../lib/formatDate';
import Pagenation from '../../islands/pagenation';

const response = await getArticles();

export default createRoute(async (c) => {
	// const { page } = c.req.param();
	// const pageNumber = Number(page);
	//
	// if (!page) {
	// 	return c.notFound();
	// }

	return c.render(
		<div class={blogContainerClass}>
			<h1 class={blogHeaderClass}>Blog</h1>
			{response.contents.length > 0 ? (
				<ul class={blogListClass}>
					{response.contents.map((article: Article) => (
						<li class={blogClass}>
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
									{article.title.length > 20 ? (
										<span title={article.title}>{`${article.title.slice(0, 20)}...`}</span>
									) : (
										<span title={article.title}>{article.title}</span>
									)}
								</a>
								<ul class={tagListClass}>
									{article.tag
										? article.tag.map((tag) => (
												<li class={tagClass}>
													<a href={`/tags/${tag}`}>{tag}</a>
												</li>
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
			<Pagenation path="blog/pages" totalCount={response.totalCount} limit={10} />
		</div>,
		{ title: 'Blog' }
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
	&:hover {
		background-color: rgba(211, 211, 211, 1);
	}
`;

const tagListClass = css`
	display: flex;
	@media (max-width: 1320px) {
		font-size: 10px;
	}
`;

const publishedDateClass = css`
	font-size: 12px;
	@media (max-width: 1320px) {
		font-size: 10px;
	}
`;

const categoryClass = css`
	font-size: 14px;
	@media (max-width: 1320px) {
		font-size: 10px;
	}
`;

const titleClass = css`
	font-size: 20px;
	width: 300px;
	color: rgb(112, 128, 144);
	&:hover {
		color: rgb(105, 105, 105);
	}
	@media (max-width: 1320px) {
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
	@media (max-width: 1320px) {
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
	@media (max-width: 1320px) {
		padding: 0.4rem;
		margin: 0.2rem;
	}
`;

const blogClass = css`
	display: flex;
	margin: 1.4rem;
	justify-content: start;
	align-items: center;
	width: 40%;
	@media (max-width: 1320px) {
		width: 100%;
		justify-content: start;
	}
`;

const blogListClass = css`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 1rem;
	@media (max-width: 1320px) {
		justify-content: center;
		flex-direction: column;
		width: 100%;
	}
`;

const blogHeaderClass = css`
	display: flex;
	justify-content: center;
`;

const blogContainerClass = css`
	font-family: sans-serif;
	width: 80%;
	margin: 0 auto;
	@media (max-width: 1320px) {
		width: 100%;
		font-size: 10px;
		padding: 0;
		margin: 0;
	}
`;
