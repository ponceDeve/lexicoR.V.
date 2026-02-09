import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Solo el nombre del repo, sin el .git ni el enlace completo
  base: '/lexicoR.V./', 
})