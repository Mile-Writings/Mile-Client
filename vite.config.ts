import prerender from '@prerenderer/rollup-plugin';
import react from '@vitejs/plugin-react';
import axios from 'axios';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

import { generateDynamicRoutes } from './src/utils/generateDynamicRoute';

function extractPostId(url: string): string {
  const lastIndex = url.lastIndexOf('/');
  return lastIndex !== -1 ? url.substring(lastIndex + 1) : url;
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isVercel = env.VERCEL === '1' || env.CI === 'true';
  const shouldPrerender = env.ENABLE_PRERENDER === 'true' && !isVercel;

  const dynamicRoutes = shouldPrerender ? await generateDynamicRoutes(env.VITE_DEV_BASE_URL) : [];

  return {
    esbuild: {
      include: /\.(ts|jsx|tsx)$/,
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      sourcemap: false,
      minify: false,
      rollupOptions: {
        input: ['/index.html'],
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },

    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: [
            [
              '@emotion/babel-plugin',
              {
                autoLabel: 'dev-only',
                labelFormat: '[filename]__[local]',
              },
            ],
          ],
        },
      }),

      ...(shouldPrerender
        ? [
            prerender({
              routes: dynamicRoutes,
              renderer: '@prerenderer/renderer-puppeteer',
              server: {
                host: 'localhost',
                port: 5173,
              },
              rendererOptions: {
                maxConcurrentRoutes: 1,
                launchOptions: {
                  // chrome 버전 이슈 해결을 위한 env 설정
                  args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    `--chrome-version=${process.env.CHROME_VERSION}`,
                  ],
                  ignoreDefaultArgs: ['--disable-extensions'],
                  ignoreHTTPSErrors: true,
                  headless: true,
                },
              },
              postProcess: async (renderRoute) => {
                const postId = extractPostId(renderRoute.route);

                try {
                  const { data } = await axios.get(`${env.VITE_DEV_BASE_URL}/api/post/${postId}`);

                  const title = data?.data?.title;
                  const imageUrl = data?.data?.imageUrl;

                  // 기존 메타 태그 제거
                  renderRoute.html = renderRoute.html
                    .replace(/http:/i, 'https:')
                    .replace(
                      /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
                      'https://www.milewriting.com',
                    )
                    .replace(/<meta property="og:title".*?>/i, '')
                    .replace(/<meta property="og:image".*?>/i, '')
                    .replace(/<meta property="og:description".*?>/i, '')
                    .replace(/<meta property="og:url".*?>/i, '')
                    .replace(
                      /<\/head>/i,
                      `
<meta property="og:title" content="${title || 'MILE'}" />
<meta property="og:image" content="${
                        imageUrl ||
                        'https://github.com/user-attachments/assets/52ce1a54-3429-4d0d-9801-e7cda913596f'
                      }" />
<meta name="keywords" content="글쓰기, 글모임, 글, 커뮤니티, 아티클" />
<meta property="og:description" content="링크를 클릭해 마일의 글을 만나보세요!" />
<meta property="og:url" content="${env.VITE_CLIENT_URL}${renderRoute.route}" />
</head>
`,
                    );
                } catch {
                  renderRoute.html = renderRoute.html.replace(
                    /<\/head>/i,
                    `
<meta property="og:title" content="MILE" />
<meta name="keywords" content="글쓰기, 글모임, 글, 커뮤니티, 아티클" />
<meta property="og:description" content="링크를 클릭해 마일의 글을 만나보세요!" />
<meta property="og:url" content="${env.VITE_CLIENT_URL}${renderRoute.route}" />
</head>
`,
                  );
                }
              },
            }),
          ]
        : []),

      svgr(),
      visualizer() as PluginOption,
    ],
  };
});
