// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  css: ["~/assets/scss/main.scss"],
  typescript: {
    strict: true,
  },
  compatibilityDate: "2025-04-04",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Удалите additionalData, так как мы используем @use
        },
      },
    },
  },
});