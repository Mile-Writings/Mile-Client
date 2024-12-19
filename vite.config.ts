import prerender from '@prerenderer/rollup-plugin';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';
function generatePerformanceRoutes() {
  const staticRoutes = ['/', '/detail']; // 정적 경로
  const dynamicRoutes = []; // 동적 경로 저장 배열
  dynamicRoutes.push('/NA==/OTI2'); // 정적 경로와 동적 경로를 결합하여 반환
  return staticRoutes.concat(dynamicRoutes);
}
export default defineConfig({
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  plugins: [
    legacy({
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
      routes: generatePerformanceRoutes(),
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
    }),
    svgr(),
    visualizer() as PluginOption,
  ],
});
