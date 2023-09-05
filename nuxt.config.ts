// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    ],
  build: {
    transpile: ['primevue']
  },
  generate: {
    fallback: true
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