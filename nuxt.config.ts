export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  css: ["~/assets/scss/main.scss"],
  typescript: {
    strict: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";',
        },
      },
    },
  },
});
