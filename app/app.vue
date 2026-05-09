<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'ru' }
})

useSeoMeta({
  title: 'RecipeBook — кулинарные рецепты',
  description: 'Хранение, поиск и фильтрация кулинарных рецептов со всего мира',
  ogTitle: 'RecipeBook',
  ogDescription: 'Хранение, поиск и фильтрация кулинарных рецептов',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <div style="min-height:100vh;display:flex;flex-direction:column">
      <LayoutTheHeader />
      <main style="flex:1">
        <NuxtPage />
      </main>
      <LayoutTheFooter />
    </div>
  </UApp>
</template>
