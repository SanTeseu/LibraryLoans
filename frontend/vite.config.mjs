// vite.config.js

import { defineConfig } from 'vite' //importa 
import vue from '@vitejs/plugin-vue' 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // adiciona na lista
  ],
  //  outras configurações aqui...
})