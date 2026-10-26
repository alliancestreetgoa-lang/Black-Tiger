import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Production builds are served from https://<user>.github.io/Black-Tiger/.
// Set BASE_PATH=/ when hosting on a custom domain such as blacktigergoa.com.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? (process.env.BASE_PATH || '/Black-Tiger/') : '/',
  plugins: [react()],
}))
