import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setupTests.ts'
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(path.join(__dirname, '/src'))
      },
      {
        find: '@redux',
        replacement: path.resolve(path.join(__dirname, '/src/redux'))
      },
      {
        find: '@hooks',
        replacement: path.resolve(path.join(__dirname, '/src/hooks'))
      },
      {
        find: '@components',
        replacement: path.resolve(path.join(__dirname, '/src/components'))
      },
      {
        find: '@helpers',
        replacement: path.resolve(path.join(__dirname, '/src/helpers'))
      }
    ]
  }
})
