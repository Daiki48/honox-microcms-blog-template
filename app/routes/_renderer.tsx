import { Style, css } from 'hono/css';
import { jsxRenderer } from 'hono/jsx-renderer';
import { Script } from 'honox/server';

import { Layout } from '../components/Layout';
import { ogpTop } from '../lib/seo';

export default jsxRenderer(({ children, title }) => {
	return (
		<html lang="ja">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta property="og:type" content={ogpTop.type} />
				<meta property="og:image" content={ogpTop.image} />
				<meta property="og:title" content={ogpTop.title} />
				<meta property="og:description" content={ogpTop.description} />
				<meta property="og:locale" content={ogpTop.locale} />
				<meta name="twitter:image" content={ogpTop.image} />
				<meta name="twitter:description" content={ogpTop.description} />
				<meta name="twitter:title" content={ogpTop.title} />
				<link rel="icon" sizes="48x48" href="/static/favicon.ico" />
				<title>
					{title} | {ogpTop.title}
				</title>
				<Script src="/app/client.ts" async />
				<Style>
					{css`
            html {
              font-size: 16px;
              font-family: system-ui, sans-serif;
							scroll-behavior: smooth;
            }
            body {
              min-height: 100vh;
              color: #262626;
              background-color: rgba(244, 244, 244, 0.8);
            }
            *,
            *::before,
            *::after {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
						a {
							text-decoration: none;
						}
          }`}
				</Style>
			</head>
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
});
