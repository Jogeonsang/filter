import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}/`,
      '~lib': `${path.resolve(__dirname, 'src/lib')}/`,
      '~pages': `${path.resolve(__dirname, 'src/pages')}/`,
      '~assets': `${path.resolve(__dirname, 'src/assets')}/`,
      '~components': `${path.resolve(__dirname, 'src/components')}/`,
      '~features': `${path.resolve(__dirname, 'src/features')}/`,
      '~hooks': `${path.resolve(__dirname, 'src/hooks')}/`,
      '~types': `${path.resolve(__dirname, 'src/types')}/`,
      '~utils': `${path.resolve(__dirname, 'src/utils')}/`,
    },
  },
});
