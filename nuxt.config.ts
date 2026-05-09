export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],

  devtools: { enabled: true },

  ssr: false,

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-15',

  future: { compatibilityVersion: 4 },

  nitro: {
    preset: 'static',
    prerender: {
      failOnError: false,
      crawlLinks: false,
      routes: ['/']
    }
  },

  app: {
    baseURL: '/',
    head: {
      title: 'RecipeBook — кулинарные рецепты',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Хранение, поиск и фильтрация кулинарных рецептов' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
