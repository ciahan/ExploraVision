import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

const repoName = '/ExploraVision/';

export default defineConfig({
  plugins: [react()],
  base: repoName
})
