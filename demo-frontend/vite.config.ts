import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows external access (LAN)
    strictPort: true,
    allowedHosts: ['pc-server'],
  }
})
