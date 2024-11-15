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
        find: '@redux',
        replacement: path.resolve(path.join(__dirname, '/src/redux'))
      },
      {
        find: '@hooks',
        replacement: path.resolve(path.join(__dirname, '/src/hooks'))
      },
      {
        find: '@config',
        replacement: path.resolve(path.join(__dirname, '/src/config'))
      },
      {
        find: '@router',
        replacement: path.resolve(path.join(__dirname, '/src/router'))
      },
      {
        find: '@pages',
        replacement: path.resolve(path.join(__dirname, '/src/pages'))
      },
      {
        find: '@components',
        replacement: path.resolve(path.join(__dirname, '/src/components'))
      },
      {
        find: '@helpers',
        replacement: path.resolve(path.join(__dirname, '/src/helpers'))
      },
      {
        find: '@context',
        replacement: path.resolve(path.join(__dirname, '/src/context'))
      },
      {
        find: '@http',
        replacement: path.resolve(path.join(__dirname, '/src/http'))
      },
      {
        find: '@interfaces',
        replacement: path.resolve(path.join(__dirname, '/src/interfaces'))
      },
      {
        find: '@wrappers',
        replacement: path.resolve(path.join(__dirname, '/src/wrappers'))
      }
    ]
  }
})
