import { PropsWithChildren, useRef } from 'hono/jsx';
import { css } from 'hono/css';
import type { HtmlContent } from '../lib/types';
import { AddHashLinks } from '../lib/getHeaders';

export default function ParsedHtml({ content }: PropsWithChildren<HtmlContent>) {
	const headers = useRef<HTMLDivElement>(null);
	AddHashLinks({ headerContent: headers, tagName: 'h2' });

	return (
		<div>
			<div class={articleContentClass} dangerouslySetInnerHTML={{ __html: content }} ref={headers} />
		</div>
	);
}

const articleContentClass = css`
	* {
		line-height: 3;
	}

	pre {
		background-color: rgb(211, 211, 211);
		margin: 0.8rem 4rem;
		padding: 0.4rem;
		border-radius: 4px;
		border: 4px solid rgba(47, 79, 79, 0.6);
		overflow: auto;
		@media (max-width: 1000px) {
			margin: 0.8rem;
		}
	}

	code {
		background-color: rgb(211, 211, 211);
		padding: 0.2rem 0.4rem;
		margin: 0.2rem;
		border-radius: 4px;
	}

	table {
		border: 1px solid gray;
	}
	table th {
		padding: 0.2rem;
		background-color: rgba(105, 105, 105, 0.2);
		border: 1px solid gray;
	}
	table td {
		padding: 0.2rem;
		border: 1px solid gray;
	}

	ul li ul {
		padding-left: 1rem;
	}

	ol li ol {
		padding-left: 1rem;
	}

	figure {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 1rem;
	}
	img {
		display: flex;
		align-items: center;
		max-width: 80%;
		height: auto;
		box-shadow: 0 0 8px gray;
	}
	a {
		color: rgba(30, 144, 255, 1);
	}
	a:hover {
		color: rgba(0, 0, 128, 1);
	}
	blockquote {
		border-left: 4px solid rgb(211, 211, 211);
		padding-left: 10px;
		margin: 10px;
		color: rgba(128, 128, 128, 1);
	}
	.iframely-responsive {
		max-width: 80%;
	}
	.iframely-embed {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 1rem;
	}
	@media (max-width: 1320px) {
		* {
			line-height: 2;
		}
		img {
			max-width: 90%;
		}
		h2 {
			margin: 1rem 0;
		}
	}
`;
