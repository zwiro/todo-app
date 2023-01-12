import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://zwiro.github.io/todo-app/',
  plugins: [react()],
})
