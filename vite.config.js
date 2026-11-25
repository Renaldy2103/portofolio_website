import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.glb'],
  build: {
    // Three.js core (`three`) is an isolated, lazily-loaded WebGL engine (~600 kB minified, ~150 kB gzip)
    // that is never downloaded on initial page load thanks to LazyViewport gating.
    chunkSizeWarningLimit: 750,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
              priority: 40,
            },
            {
              name: 'vendor-motion',
              test: /node_modules[\\/](framer-motion|motion|motion-dom|motion-utils)[\\/]/,
              priority: 35,
            },
            {
              name: 'vendor-gsap',
              test: /node_modules[\\/](gsap|@gsap|lenis)[\\/]/,
              priority: 30,
            },
            {
              name: 'vendor-three',
              test: /node_modules[\\/]three[\\/]/,
              priority: 25,
            },
            {
              name: 'vendor-r3f',
              test: /node_modules[\\/](@react-three|three-stdlib|its-fine|suspend-react|zustand|maath|meshline)[\\/]/,
              priority: 20,
            },
            {
              name: 'vendor-icons',
              test: /node_modules[\\/](react-icons|lucide-react)[\\/]/,
              priority: 15,
            },
          ],
        },
      },
    },
  },
})
