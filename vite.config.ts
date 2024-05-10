import pages from '@hono/vite-cloudflare-pages';
import honox from 'honox/vite';
import client from 'honox/vite/client';
import { defineConfig } from 'vite';
import { getPlatformProxy } from 'wrangler'

export default defineConfig( async ({ mode, command }) => {
	if (mode === 'client') {
		return {
			plugins: [client()]
		};
	} 

	  // ref: https://github.com/honojs/honox/issues/109
  if (command === "build") {
    return {
      plugins: [honox(), pages()],
    };
  }

	  // ref: https://github.com/honojs/honox/issues/39
  const { env, dispose } = await getPlatformProxy();
  return {
		ssr: {
				external: ['microcms-js-sdk']
			},
    plugins: [
      honox({ devServer: { env, plugins: [{ onServerClose: dispose }] } }),
      pages(),
    ],
		build: {
			target: 'esnext'
		},
    server: {
      port: 5173,
    },
  };
});
