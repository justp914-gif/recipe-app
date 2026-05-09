<template>
  <div class="page-container">
    <NuxtLink to="/" style="display:inline-flex;align-items:center;gap:0.375rem;color:#6b7280;font-size:0.875rem;margin-bottom:1.5rem;text-decoration:none">
      ← Назад к рецептам
    </NuxtLink>

    <div v-if="pending" style="text-align:center;padding:4rem 0">
      <div class="skeleton" style="height:2rem;width:60%;margin:0 auto 1rem;border-radius:0.5rem"></div>
      <div class="skeleton" style="height:400px;width:100%;border-radius:1rem"></div>
    </div>

    <div v-else-if="error || !recipe" style="text-align:center;padding:4rem 0">
      <p style="font-size:3rem">😢</p>
      <p style="color:#6b7280">Рецепт не найден</p>
    </div>

    <div v-else>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start" class="recipe-detail">
        <div>
          <img
            :src="recipe.strMealThumb"
            :alt="recipe.strMeal"
            style="width:100%;border-radius:1rem;object-fit:cover;aspect-ratio:1"
          />
        </div>

        <div>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:1rem">
            <h1 style="font-size:1.75rem;font-weight:800;color:#111827;line-height:1.2">
              {{ recipe.strMeal }}
            </h1>
            <button
              style="flex-shrink:0;font-size:1.5rem;background:none;border:none;cursor:pointer"
              :title="isFav ? 'Убрать из избранного' : 'В избранное'"
              @click="toggleFav"
            >
              {{ isFav ? '❤️' : '🤍' }}
            </button>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.5rem">
            <span v-if="recipe.strCategory" style="background:#fff7ed;color:#c2410c;padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.8125rem;font-weight:600">
              🍽 {{ recipe.strCategory }}
            </span>
            <span v-if="recipe.strArea" style="background:#f0fdf4;color:#166534;padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.8125rem;font-weight:600">
              🌍 {{ recipe.strArea }}
            </span>
          </div>

          <h2 style="font-size:1.125rem;font-weight:700;color:#111827;margin-bottom:0.75rem">Ингредиенты</h2>
          <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.375rem">
            <li
              v-for="item in ingredients"
              :key="item.ingredient"
              style="display:flex;justify-content:space-between;padding:0.375rem 0;border-bottom:1px solid #f3f4f6;font-size:0.9375rem"
            >
              <span>{{ item.ingredient }}</span>
              <span style="color:#6b7280;font-weight:500">{{ item.measure }}</span>
            </li>
          </ul>

          <a
            v-if="recipe.strYoutube"
            :href="recipe.strYoutube"
            target="_blank"
            rel="noopener"
            style="display:inline-flex;align-items:center;gap:0.5rem;margin-top:1.25rem;padding:0.625rem 1.25rem;background:#ef4444;color:white;border-radius:0.75rem;font-weight:600;text-decoration:none;font-size:0.9375rem"
          >
            ▶ Смотреть на YouTube
          </a>
        </div>
      </div>

      <div style="margin-top:2.5rem">
        <h2 style="font-size:1.25rem;font-weight:700;color:#111827;margin-bottom:1rem">Инструкция по приготовлению</h2>
        <div style="color:#374151;line-height:1.8;white-space:pre-line;font-size:0.9375rem">
          {{ recipe.strInstructions }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MealDbService } from '~/services/MealDbService'
import { useFavoritesStore } from '~/stores/favorites'

const route = useRoute()
const favStore = useFavoritesStore()
const service = MealDbService.getInstance()

const { data: recipe, pending, error } = await useAsyncData(
  `recipe-${route.params.id}`,
  () => service.getById(route.params.id as string)
)

const ingredients = computed(() => recipe.value ? service.getIngredients(recipe.value) : [])
const isFav = computed(() => recipe.value ? favStore.isFavorite(recipe.value.idMeal) : false)

function toggleFav() {
  if (!recipe.value) return
  favStore.toggle({
    idMeal: recipe.value.idMeal,
    strMeal: recipe.value.strMeal,
    strMealThumb: recipe.value.strMealThumb,
    strCategory: recipe.value.strCategory,
    strArea: recipe.value.strArea
  })
}

useSeoMeta({
  title: computed(() => recipe.value?.strMeal ?? 'Рецепт'),
  description: computed(() => recipe.value?.strInstructions?.slice(0, 150) ?? '')
})
</script>

<style>
@media (max-width: 768px) {
  .recipe-detail {
    grid-template-columns: 1fr !important;
  }
}
</style>
