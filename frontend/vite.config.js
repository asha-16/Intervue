import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // explicitly set base path for SPA
  build: {
    outDir: 'dist', // make sure build output is 'dist'
  },
})
