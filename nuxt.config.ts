
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  css: ['~/assets/scss/main.scss'],
  typescript: {
    strict: true
  },
  compatibilityDate: '2025-04-04',
  

  imports: {
    autoImport: true,
    dirs: ['stores', 'composables']
  },

  components: {
    global: true,
    dirs: ['~/components']
  }
  

})