import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'heretics-site',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'heretics-site/index.html'),
        'agent-specs': resolve(__dirname, 'heretics-site/agent-specs.html'),
        'identity-graph': resolve(__dirname, 'heretics-site/identity-graph.html'),
        infrastructure: resolve(__dirname, 'heretics-site/infrastructure.html'),
        lexicon: resolve(__dirname, 'heretics-site/lexicon.html'),
        provenance: resolve(__dirname, 'heretics-site/provenance.html'),
        'sovereignty-map': resolve(__dirname, 'heretics-site/sovereignty-map.html'),
        'spine-v4': resolve(__dirname, 'heretics-site/spine-v4.html'),
        'split-funnel-map': resolve(__dirname, 'heretics-site/split-funnel-map.html'),
      },
    },
  },
})
