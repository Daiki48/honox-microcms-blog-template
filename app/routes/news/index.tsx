import { css } from 'hono/css';
import { createRoute } from 'honox/factory';

import { getNews, type News } from '../../lib/microcms';
import { jstFromUtcDate } from '../../lib/formatDate';
import Pagenation from '../../islands/pagenation';

export default createRoute(async (c) => {
	const response = await getNews();
	return c.render(
		<div class={blogContainerClass}>
			<h1 class={blogHeaderClass}>News</h1>
			{response.contents.length > 0 ? (
				<ul class={blogListClass}>
					{response.contents.map((news: News) => (
						<li class={blogClass}>
							<div class={imgClass}>
								{news.eyecatch ? (
									<img src={news.eyecatch.url} alt="eyecatch" width="50px" height="auto" />
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
								<a href={`/news/${news.id}`} class={titleClass}>
									{news.title.length > 20 ? (
										<span title={news.title}>{`${news.title.slice(0, 20)}...`}</span>
									) : (
										<span title={news.title}>{news.title}</span>
									)}
								</a>
								<div class={blogMetaFooterClass}>
									<time class={publishedDateClass}>{jstFromUtcDate(news.publishedAt)}</time>
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

const publishedDateClass = css`
	font-size: 12px;
	@media (max-width: 800px) {
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

const blogClass = css`
	display: flex;
	margin: 1rem;
	justify-content: start;
	align-items: center;
	@media(max-width: 500px) {
		margin: 0;
		padding: 0;
	}
`;

const blogListClass = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	gap: 1.4rem;
	justify-items: center;
	padding: 0;
	margin: 0;
	list-style-type: none;
	text-align: left;
	@media(max-width: 500px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

const blogHeaderClass = css`
	display: flex;
	justify-content: center;
`;

const blogContainerClass = css`
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
