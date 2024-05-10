// import { promises as fs } from 'node:fs';
import { marked } from 'marked';

export const convertToHtml = async (markdown: string) => {
	// const content = await fs.readFile(markdown, 'utf-8');
	const file = Bun.file(markdown);
	const content = await file.text();
	const html = marked(content);
	return html;
};
