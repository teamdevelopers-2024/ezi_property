import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    port: 5173,
    strictPort: true,
    host: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
