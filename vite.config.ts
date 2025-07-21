import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import { execSync } from 'child_process';
import chokidar from 'chokidar';

const contentPlugin = (): Plugin => ({
  name: 'content-plugin',
  // This hook runs when the dev server starts
  configureServer(server) {
    // Run the build script once on startup
    console.log('Building initial content...');
    execSync('node ./scripts/build-content.js');
    console.log('Initial content built.');

    const watcher = chokidar.watch('content/**/*', {
      persistent: true,
      ignoreInitial: true,
    });

    watcher.on('all', (_, path) => {
      console.log(`Content change detected: ${path}. Rebuilding...`);
      // Rebuild the content files
      execSync('node ./scripts/build-content.js');
      server.ws.send({ type: 'full-reload', path: '*' });
      console.log('Content rebuilt. Page will reload.');
    });
  },
});

export default defineConfig({
  base: '/soundflow-docs',
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkGfm],
      jsxImportSource: 'react',
      development: process.env.NODE_ENV === 'development',
    }),
    react({
      include: /\.(jsx|tsx)$/,
    }),
    contentPlugin(),
  ],
  // Ensure proper loaders for different file types
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[jt]sx?$/,
    sourcemap: true
  },
});