export default defineNuxtConfig({
  pages: true,
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@nuxtjs/supabase'
  ],
  runtimeConfig: {
    public: {
      bucket: process.env.BUCKET_URL
    }
  }
})
