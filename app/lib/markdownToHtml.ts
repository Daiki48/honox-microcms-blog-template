import { promises as fs } from 'fs';
import { marked } from 'marked';

export const convertToHtml = async (markdown: string) => {
	const content = await fs.readFile(markdown, 'utf-8');
	const html = marked(content);
	return html;
};
