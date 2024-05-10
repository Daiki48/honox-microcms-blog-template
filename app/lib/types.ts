import { type RefObject } from 'hono/jsx';

export type HtmlContent = {
	tagName?: string;
	content: string;
};

export type HashLinks = {
	headerContent: RefObject<HTMLDivElement>;
	tagName: string;
};

export type ArticleTotalCount = {
	path: string;
	totalCount: number;
	limit: number;
};
