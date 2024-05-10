import { PropsWithChildren, useRef } from 'hono/jsx';
import { css } from 'hono/css';
import type { HtmlContent } from '../lib/types';
import { TocList } from '../lib/getHeaders';

export default function Toc({ content }: PropsWithChildren<HtmlContent>) {
	const headers = useRef<HTMLDivElement>(null);
	const { tocHeaders, innerText } = TocList({ headerContent: headers, tagName: 'h2' });

	return (
		<div class={mainClass}>
			<h4 class={tocTitleClass}>目次</h4>
			<div ref={headers} dangerouslySetInnerHTML={{ __html: content }} class={hideHtmlClass} />
			<nav>
				<ol>
					{tocHeaders.map((header, index) => (
						<li class={headerClass}>
							<a href={`#${header}`}>{innerText[index]}</a>
						</li>
					))}
				</ol>
			</nav>
		</div>
	);
}

const mainClass = css`
	font-family: sans-serif;
	line-height: 1.8;
	padding: 2.4rem;
	height: auto;
	width: 100%;
	overflow: auto;
	a {
		text-decoration: none;
	}
`;

const headerClass = css`
	font-size: 0.9rem;
	line-break: anywhere;
	a {
		color: rgba(100, 100, 100, 1);
	}
	a:hover {
		color: rgba(255, 127, 80, 1);
	}
`;

const tocTitleClass = css`
	padding-bottom: 0.6rem;
`;

const hideHtmlClass = css`
	display: none;
`;
