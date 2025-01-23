import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-pii-mask': path.resolve(__dirname, '../src'),
      'react-pii-mask/styles.css': path.resolve(__dirname, '../src/styles.css')
    }
  }
});
