import { css } from 'hono/css';
import { PropsWithChildren } from 'hono/jsx';
import type { ArticleTotalCount } from '../lib/types';

export default function Pagenation({
	path,
	totalCount,
	limit
}: PropsWithChildren<ArticleTotalCount>) {
	const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);

	const totalPages = Math.ceil(totalCount / limit);

	return (
		<ul class={pagenationClass}>
			{totalPages > 1 &&
				range(1, Math.ceil(totalCount / limit)).map((page, index) => (
					<a href={`/${path}/${page}`}>
						<li key={index} class={pageNumberClass}>
							{page}
						</li>
					</a>
				))}
		</ul>
	);
}

const pageNumberClass = css`
	list-style: none;
	padding: 0.2rem 0.6rem;
	margin: 0.4rem;
	background-color: rgba(220, 220, 220, 0.6);
	border-radius: 4px;
	box-shadow: 0 0 3px gray;
	font-size: 20px;
	color: rgba(105, 105, 105, 1);
	&:hover {
		background-color: rgba(220, 220, 220, 1);
		box-shadow: 0 0 10px gray;
		color: rgba(255, 127, 80, 1);
	}
`;

const pagenationClass = css`
	display: flex;
	justify-content: center;
`;
