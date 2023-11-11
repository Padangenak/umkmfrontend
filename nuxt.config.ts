// https://nuxt.com/docs/api/configuration/nuxt-config
import axios from 'axios'
export default defineNuxtConfig({
  // devtools: { enabled: true },
  ssr: false,
  css: [
    '~/assets/css/main.css',
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    ],
  build: {
    transpile: ['primevue']
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig:{
    public:{
      URL_API: process.env.URL_API,
      STORAGE_API: process.env.STORAGE_API
    }
  }
})