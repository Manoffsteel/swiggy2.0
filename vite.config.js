import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';  // Import the React plugin
import path from 'path';  // Import path for resolving aliases

// Vite configuration
export default defineConfig({
  plugins: [react()],
 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Alias for the 'src' folder
    },
  },
});

// server: {
//   proxy: {
//     '/api': {
//       target: 'https://www.swiggy.com',
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' prefix
//     },
//   },
// },