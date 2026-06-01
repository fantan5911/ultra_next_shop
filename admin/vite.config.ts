import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, type ManifestOptions } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite';

const manifest: Partial<ManifestOptions> | false = {"theme_color":"#8936FF","background_color":"#2EC6FE","icons":[{"purpose":"maskable","sizes":"512x512","src":"icon512_maskable.png","type":"image/png"},{"purpose":"any","sizes":"512x512","src":"icon512_rounded.png","type":"image/png"}],"orientation":"any","display":"standalone","lang":"ru","name":"Admin","start_url":"/smartphones"};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    },
    manifest: manifest
  })],
  server: {
    port: 2000,
    host: true,
  },
})
