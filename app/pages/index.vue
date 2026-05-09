<template>
  <div>
    <section class="hero">
      <h1 class="hero__title">Найдите идеальный рецепт 🍽</h1>
      <p class="hero__subtitle">Тысячи блюд со всего мира — ищите, сохраняйте, готовьте</p>
      <div class="hero__search">
        <SearchBar :model-value="filters.query" @search="setQuery" />
      </div>
    </section>

    <div class="page-container">
      <div style="margin-bottom:1.5rem">
        <FilterPanel
          :categories="categories"
          :active="filters.category"
          @select="setCategory"
        />
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:0.5rem">
        <h2 class="section-title" style="margin-bottom:0">
          {{ sectionTitle }}
        </h2>
        <button
          v-if="filters.query || filters.category || filters.area"
          style="font-size:0.8125rem;color:#6b7280;cursor:pointer;background:none;border:none;text-decoration:underline"
          @click="reset"
        >
          Сбросить фильтры
        </button>
      </div>

      <RecipeList :recipes="recipes" :loading="loading" :error="error" @retry="load" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MealDbService } from '~/services/MealDbService'
import { useRecipes } from '~/composables/useRecipes'

const { recipes, loading, error, filters, load, setQuery, setCategory, reset } = useRecipes()

const categories = ref<string[]>([])

const sectionTitle = computed(() => {
  if (filters.query) return `Результаты для «${filters.query}»`
  if (filters.category) return `Категория: ${filters.category}`
  if (filters.area) return `Кухня: ${filters.area}`
  return 'Рецепты дня'
})

onMounted(async () => {
  const service = MealDbService.getInstance()
  const [cats] = await Promise.all([service.getCategories(), load()])
  categories.value = cats.slice(0, 10)
})

useSeoMeta({ title: 'RecipeBook — кулинарные рецепты', description: 'Поиск и хранение рецептов' })
</script>
