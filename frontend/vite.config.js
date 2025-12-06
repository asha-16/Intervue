import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base: '/', // explicitly set base path for SPA
  build: {
    outDir: 'dist', // make sure build output is 'dist'
  },
})
