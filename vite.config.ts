import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/Coino',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/breakpoint.scss";'
      }
    }
  }
});
