import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';
import prerender from '@prerenderer/rollup-plugin';

import { allPostParsing } from './src/utils/allPostParsing';
import axios from 'axios';

type GroupPostIdentifierTypes = {
  groupId: string;
  postId: string;
};
const generatePerformanceRoutes = async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const dynamicRoutes: string[] = []; // 동적 경로 저장 배열

  const data: GroupPostIdentifierTypes[] = await allPostParsing(env.VITE_DEV_BASE_URL);

  data.map((items: GroupPostIdentifierTypes) => {
    dynamicRoutes.push(`/detail/${items.groupId}/${items.postId}`); // 정적 경로와 동적 경로를 결합하여 반환
  });

  return dynamicRoutes;
};

function extractLastSegment(url: string): string {
  const lastIndex = url.lastIndexOf('/');
  return lastIndex !== -1 ? url.substring(lastIndex + 1) : url;
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const dynamicRoutes = await generatePerformanceRoutes({ mode });

  return {
    esbuild: {
      // configure this value when the browser version of the development environment is lower
      // minimum support es2015
      // https://esbuild.github.io/api/#target
      //target: 'es2015',
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
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              `--chrome-version=${env.CHROME_VERSION}`,
            ],
            ignoreDefaultArgs: ['--disable-extensions'],

            ignoreHTTPSErrors: true,
            headless: true,
          },
        },
        postProcess: async (renderRoute) => {
          const { data } = await axios.get(
            `${env.VITE_DEV_BASE_URL}/api/post/${extractLastSegment(renderRoute.route)}`,
          );

          const title = data.data.title;
          const imageUrl = data.data.imageUrl;

          renderRoute.html = renderRoute.html
            .replace(/http:/i, 'https:')
            .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i, 'https://www.milewriting.com');

          //기존 meta tag삭제
          renderRoute.html = renderRoute.html
            .replace(/<meta property="og:title".*?>/i, '')
            .replace(/<meta property="og:image".*?>/i, '')
            .replace(/<meta property="og:description".*?>/i, '')
            .replace(/<meta property="og:url".*?>/i, '');

          renderRoute.html = renderRoute.html.replace(
            /<\/head>/i,
            `
                <meta property="og:title" content="${title || 'MILE'}" />
                <meta property="og:image" content="${
                  imageUrl ||
                  'https://github.com/user-attachments/assets/52ce1a54-3429-4d0d-9801-e7cda913596f'
                }" />
                <meta name="keywords" content="글쓰기, 글모임, 글, 커뮤니티, 아티클" />
                <meta property="og:description" content="${'링크를 클릭해 마일의 글을 만나보세요'}" />
                <meta property="og:url" content="${env.VITE_CLIENT_URL}${renderRoute.route}" />
              </head>
            `,
          );
        },
      }),

      svgr(),
      visualizer() as PluginOption,
    ],
  };
});
