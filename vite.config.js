import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/jano-restaurant-redesign/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom/client': 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        menu: resolve(import.meta.dirname, 'menu/index.html'),
        box: resolve(import.meta.dirname, 'box/index.html'),
      },
    },
  },
})
