import prerender from '@prerenderer/rollup-plugin';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';
import getAllpost from './src/utils/apis/getAllPost';

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
const generatePerformanceRoutes = async (url: string) => {
  const staticRoutes = ['/', '/detail']; // 정적 경로
  const dynamicRoutes: string[] = []; // 동적 경로 저장 배열

  const data: postListMoimMap1[] = await fetchAllPostWithGroup(url);

  data.map((items: postListMoimMap1) => {
    dynamicRoutes.push(`/detail/${items.key}/${items.value}`); // 정적 경로와 동적 경로를 결합하여 반환
  });

  // staticRoutes.concat(dynamicRoutes);
  // console.log(staticRoutes);
  return dynamicRoutes;
};

const fetchAllPostWithGroup = async (url: string) => {
  const data = await getAllpost(url);

  const postListWithGroup: PostListWithGroup = data?.data?.data;

  const result = Object.entries(postListWithGroup.postListMoimMap).flatMap(
    ([key, values]: [string, string[]]) => values.map((value: string) => ({ key, value })),
  );

  return result;
};

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const dynamicRoutes = await generatePerformanceRoutes(env.VITE_DEV_BASE_URL);

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
      // target: 'es2015',
      outDir: 'build',
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
      legacy({
        //import.meta 사용하기 위한 최소 버전
        targets: ['chrome >= 64', 'safari >= 12'],
        renderLegacyChunks: true,
        modernPolyfills: true,
      }),
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
        rendererOptions: {},
      }),
      svgr(),
      visualizer() as PluginOption,
    ],
  };
});
