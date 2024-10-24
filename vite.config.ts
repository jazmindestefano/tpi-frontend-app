import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV
    },
    plugins: [react()],
    envPrefix: 'VITE_',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/__tests__/setupTests.ts'
    }
  }
})
