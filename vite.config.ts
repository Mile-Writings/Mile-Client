import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import ViteSvgPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteSvgPlugin()],
});
