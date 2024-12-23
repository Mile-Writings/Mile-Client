// import prerender from '@prerenderer/renderer-puppeteer';
import prerender from '@prerenderer/rollup-plugin';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';
import getAllPost from './src/utils/apis/getAllPost';
// interface PostListWithGroup {
//   [key: string]: string[]; // key는 문자열이고, 값은 문자열 배열
// }
type postListMoimMap = {
  [key: string]: string[]; // key는 문자열, 값은 문자열 배열
};

type postListMoimMap1 = {
  key: string;
  value: string; // key는 문자열,
};
interface PostListWithGroup {
  postListMoimMap: postListMoimMap;
}

// async function ssr(url) {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto(url, { waitUntil: 'networkidle0' });
//   const html = await page.content(); // serialized HTML of page DOM.
//   await browser.close();
//   return html;
// }
const generatePerformanceRoutes = async (url: string) => {
  const staticRoutes = ['/']; // 정적 경로
  const dynamicRoutes: string[] = []; // 동적 경로 저장 배열

  const data: postListMoimMap1[] = await fetchAllPostWithGroup(url);

  data.map((items: postListMoimMap1) => {
    // ssr(`https://milewriting.com/detail/${items.key}/${items.value}`);
    dynamicRoutes.push(`/detail/${items.key}/${items.value}`); // 정적 경로와 동적 경로를 결합하여 반환

    // (async () => {
    //   const browser = await puppeteer.launch({
    //     headless: true, // 브라우저가 백그라운드에서 실행되도록 설정
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   });
    //   const page = await browser.newPage();
    //   await page.goto(`https://www.milewriting.com/detail/${items.key}/${items.value}`);
    //   const html = await page.content();
    //   console.log(html);
    //   await browser.close();
    // })();
  });

  // staticRoutes.concat(dynamicRoutes);
  // console.log(staticRoutes);
  return dynamicRoutes;
};

const fetchAllPostWithGroup = async (url: string) => {
  const data = await getAllPost(url);

  const postListWithGroup: PostListWithGroup = data?.data?.data;

  const result = Object.entries(postListWithGroup.postListMoimMap).flatMap(
    ([key, values]: [string, string[]]) => values.map((value: string) => ({ key, value })),
  );

  return result;
};

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const dynamicRoutes = await generatePerformanceRoutes(env.VITE_DEV_BASE_URL);

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
      // target: 'es2015',
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
          port: 8000,
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
        // postProcess(dynamicRoutes) {
        //   dynamicRoutes.html = dynamicRoutes.html
        //     .replace(/http:/i, 'https:')
        //     .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i, 'https://www.milewriting.com/');
        // },
      }),

      // {
      //   ...prerender({
      //     // routes: dynamicRoutes,
      //     routes: dynamicRoutes,
      //     renderer: '@prerenderer/renderer-puppeteer',
      //     // rendererOptions: {
      //     //   maxConcurrentRoutes: 1,
      //     //   renderAfterTime: 10000,
      //     // },
      //   }),
      //   enforce: 'pre', // 'enforce' 속성 추가
      // },
      svgr(),
      visualizer() as PluginOption,
    ],
  };
});
