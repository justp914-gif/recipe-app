<template>
  <div class="page-container">
    <h1 class="section-title">📂 Категории блюд</h1>

    <div v-if="pending" class="recipe-list">
      <div v-for="n in 12" :key="n" class="recipe-card">
        <div class="skeleton" style="aspect-ratio:4/3;width:100%"></div>
        <div class="recipe-card__body">
          <div class="skeleton" style="height:1.25rem;width:70%;border-radius:0.25rem"></div>
        </div>
      </div>
    </div>

    <div v-else class="recipe-list">
      <article
        v-for="cat in categories"
        :key="cat.strCategory"
        class="recipe-card"
        @click="navigateTo({ path: '/', query: { category: cat.strCategory } })"
      >
        <div class="recipe-card__image-wrap">
          <img
            :src="cat.strCategoryThumb"
            :alt="cat.strCategory"
            class="recipe-card__image"
            loading="lazy"
          />
        </div>
        <div class="recipe-card__body">
          <h3 class="recipe-card__title">{{ cat.strCategory }}</h3>
          <p style="font-size:0.8125rem;color:#6b7280;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">
            {{ cat.strCategoryDescription }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: categories, pending } = await useAsyncData('categories', async () => {
  const data = await $fetch<{ categories: {
    idCategory: string
    strCategory: string
    strCategoryThumb: string
    strCategoryDescription: string
  }[] }>('https://www.themealdb.com/api/json/v1/1/categories.php')
  return data.categories
})

useSeoMeta({ title: 'Категории — RecipeBook' })
</script>
