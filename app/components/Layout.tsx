import { css, cx } from 'hono/css';
import type { FC } from 'hono/jsx';
import { useRequestContext } from 'hono/jsx-renderer';

const links = [
	{ href: '/about', view: 'About' },
	{ href: '/blog', view: 'Blog' },
	{ href: '/tags', view: 'Tags' }
];

export const Layout: FC = ({ children }) => {
	const c = useRequestContext();
	const current = c.req.path;
	return (
		<div class={container}>
			<header class={headerClass}>
				<h1 class={titleClass}>
					<a href="/" class={titleLinkClass}>
						<img src="/static/honox-blog-template-icon.png" alt="icon" width="40px" class={imgClass} />
						<span class={titleTextClass}>HonoX MicroCMS Blog Template</span>
					</a>
				</h1>
				<nav class={navClass}>
					{links.map((link) => (
						<a href={link.href} class={cx(linkClass, current === link.href && activeLinkClass)}>
							{link.view}
						</a>
					))}
				</nav>
			</header>
			<main class={mainContainerClass}>{children}</main>
			<footer class={footerClass}>
				<span>Copyright 2024 HonoX MicroCMS Blog Template</span>
			</footer>
		</div>
	);
};

const imgClass = css`
	border-radius: 4px;
	margin: 4px;
`;

const titleClass = css`
	font-size: 20px;
`;

const titleTextClass = css`
	color: #111;
	@media (max-width: 1000px) {
		display: none;
	}
`;

const titleLinkClass = css`
	display: flex;
	align-items: center;
`;

const headerClass = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 4rem;
`;

const mainContainerClass = css`
	max-width: 80%;
	margin: 0 auto;
	padding: 0.8rem;
	flex: 1;
	min-height: 100vh;
	@media (max-width: 1000px) {
		font-size: 10px;
		max-width: 100%;
	}
`;

const navClass = css`
	display: flex;
	gap: 1rem;
`;

const linkClass = css`
	padding: 0.5rem;
	color: rgba(105, 105, 105, 1);
`;

const activeLinkClass = css`
	backgrond-color: rgba(230, 230, 230, 0.9);
`;

const footerClass = css`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 1rem;
	@media (max-width: 1320px) {
		font-size: 10px;
	}
`;

const container = css`
	display: flex;
	flex-flow: column;
	min-height: 90vh;
`;
