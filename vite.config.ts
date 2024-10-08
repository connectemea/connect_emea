import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
