import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    // proxy: {
    //   '^/users/.*': {
    //     target: 'http://digitiamo-fastapi:8000',
    //     secure: false,
    //   },
    //   '^/auth/.*': {
    //     target: 'http://digitiamo-fastapi:8000',
    //     secure: false,
    //   },
    //   '^/book/.*': {
    //     target: 'http://digitiamo-fastapi:8000',
    //     secure: false,
    //   },
    proxy: {
      '^/users/.*': {
        target: 'http://localhost:8000',
        secure: false,
      },
      '^/auth/.*': {
        target: 'http://localhost:8000',
        secure: false,
      },
      '^/book/.*': {
        target: 'http://localhost:8000',
        secure: false,
      },
    },
  },
  plugins: [react()],
});