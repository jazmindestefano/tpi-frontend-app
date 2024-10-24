import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  define: {
    'process.env': process.env
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setupTests.ts'
  }
})
