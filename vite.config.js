import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function resolve (dir) {
  return fileURLToPath(new URL(dir, import.meta.url))
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': resolve('./src'),
      '@components': resolve('./src/components'),
      '@helpers': resolve('./src/helpers'),
      '@mock': resolve('./src/mock')
    }
  }
})
