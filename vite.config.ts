//  import prerender from '@prerenderer/renderer-puppeteer';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';
import prerender from '@prerenderer/rollup-plugin';

import { allPostParsing } from './src/utils/allPostParsing';
import axios from 'axios';

type GroupPostIdentifierTypes = {
  groupId: string;
  postId: string; // key는 문자열,
};
const generatePerformanceRoutes = async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const dynamicRoutes: string[] = []; // 동적 경로 저장 배열

  const data: GroupPostIdentifierTypes[] = await allPostParsing(env.VITE_DEV_BASE_URL);

  data.map((items: GroupPostIdentifierTypes) => {
    dynamicRoutes.push(`/detail/${items.groupId}/${items.postId}`); // 정적 경로와 동적 경로를 결합하여 반환
    // const metaData = await getPostDetailParsingMetaTg(`${items.value}`);
  });

  return dynamicRoutes;
};

function extractLastSegment(url: string): string {
  const lastIndex = url.lastIndexOf('/');
  return lastIndex !== -1 ? url.substring(lastIndex + 1) : url;
}

// async function ssr(url) {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto(url, { waitUntil: 'networkidle0' });
//   const html = await page.content(); // serialized HTML of page DOM.
//   await browser.close();
//   return html;
// }

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const dynamicRoutes = await generatePerformanceRoutes({ mode });

  // const browser = await puppeteer.launch({
  //   executablePath: '/path/to/Chrome',
  // });
  return {
    // server: {
    //   proxy: {
    //     // 문자열만: http://localhost:5173/foo -> http://localhost:4567/foo
    //     '/api': 'http://localhost:5173',
    //   },
    // },

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
      // legacy({
      //   //import.meta 사용하기 위한 최소 버전
      //   targets: ['chrome >= 64', 'safari >= 12'],
      //   renderLegacyChunks: true,
      //   modernPolyfills: true,
      // }),

      // legacy({
      //   //? 사용하기 위한 최소 버전
      //   targets: ['chrome >= 80', 'safari >= 13.4'],
      //   renderLegacyChunks: true,
      //   modernPolyfills: true,
      // }),

      // legacy({
      //   //? 사용하기 위한 최소 버전
      //   targets: ['chrome >= 64', 'edge >= 79', 'safari >= 11.1', 'firefox >= 67', 'ie >= 11'],
      //   renderLegacyChunks: false,
      //   modernPolyfills: true,
      // }),

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
        // routes: dynamicRoutes,
        routes: dynamicRoutes,
        renderer: '@prerenderer/renderer-puppeteer',
        server: {
          host: 'localhost',
          port: 5173,
        },
        // puppeteer: async () => {
        //   const browser = await puppeteer.launch({
        //     headless: true,
        //     args: [
        //       '--no-sandbox',
        //       '--cdisable-setuid-sandbox',
        //       `-–chrome-version=${env.CHROME_VERSION}`,
        //     ],
        //   });
        // },
        // postProcess: postProcess,
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
          // console.log(renderRoute.html);
          console.log(renderRoute.route);
          console.log('test');
          const { data } = await axios.get(
            `${env.VITE_DEV_BASE_URL}/api/post/${extractLastSegment(renderRoute.route)}`,
          );

          console.log(data);
          const title = data.data.title;
          const imageUrl = data.data.imageUrl;
          console.log(title);
          console.log(imageUrl);
          // console.log(`${env.VITE_DEV_BASE_URL}/api/post/${extractLastSegment(renderRoute.route)}`);
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
                <meta property="og:url" content="${env.CLIENT_URL}${renderRoute.route}" />
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
