import { fileURLToPath, URL } from 'node:url';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import VitePluginWebpAndPath from 'vite-plugin-webp-and-path';

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ViteImageOptimizer({
    //     jpg: {
    //     // https://sharp.pixelplumbing.com/api-output#jpeg
    //     quality: 70,
    //     progressive: true,                               
    //   },                  
    // }),  
    splitVendorChunkPlugin(),
    VitePluginWebpAndPath({
      quality: 70
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
