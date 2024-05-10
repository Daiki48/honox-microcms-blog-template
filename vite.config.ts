import pages from '@hono/vite-cloudflare-pages';
import honox from 'honox/vite';
import client from 'honox/vite/client';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	if (mode === 'client') {
		return {
			plugins: [client()]
		};
	} else {
		return {
			ssr: {
				external: ['microcms-js-sdk']
			},
			plugins: [honox(), pages()],
			build: {
				target: 'esnext'
			}
		};
	}
});
