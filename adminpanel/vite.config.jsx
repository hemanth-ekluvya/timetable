import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add this to prevent .js/.tsx conflicts
      './switch': path.resolve(__dirname, './src/components/ui/switch.tsx')
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.(tsx|js)$/,
  }
})