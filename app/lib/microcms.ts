import { createClient } from 'microcms-js-sdk';

type Eyecatch = {
	url: string;
	height: string;
	width: string;
};

export type Article = {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	category: string;
	tag: string[] | undefined;
	title: string;
	description: string;
	eyecatch: Eyecatch | undefined;
	content: string;
};

export type ArticleResponse = {
	totalCount: number;
	offset: number;
	limit: number;
	contents: Article[];
};

export const microcmsClient = createClient({
	serviceDomain: import.meta.env.VITE_SERVICE_DOMAIN,
	apiKey: import.meta.env.VITE_API_KEY
});

export const getArticles = async (pageNum?: number) => {
	const articlesLimit = 10;
	if (pageNum) {
		return await microcmsClient.get<ArticleResponse>({
			endpoint: 'article',
			queries: {
				fields: [
					'id',
					'tag',
					'category',
					'title',
					'description',
					'eyecatch',
					'content',
					'publishedAt'
				],
				orders: '-publishedAt',
				offset: (pageNum - 1) * articlesLimit,
				limit: articlesLimit
			}
		});
	} else {
		return await microcmsClient.get<ArticleResponse>({
			endpoint: 'article',
			queries: {
				fields: [
					'id',
					'tag',
					'category',
					'title',
					'description',
					'eyecatch',
					'content',
					'publishedAt'
				],
				orders: '-publishedAt',
				offset: 0,
				limit: articlesLimit
			}
		});
	}
};

export const getArticleById = async (response: ArticleResponse, id: string) => {
	return response.contents.find((article: Article) => article.id === id);
};

export const getArticlesByTag = async (response: ArticleResponse, tag: string) => {
	return response.contents.filter((article: Article) => article.tag?.includes(tag));
};
