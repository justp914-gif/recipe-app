<template>
  <div>
    <div v-if="loading" class="recipe-list">
      <div v-for="n in 12" :key="n" class="recipe-card">
        <div class="skeleton" style="aspect-ratio:4/3;width:100%"></div>
        <div class="recipe-card__body" style="gap:0.75rem">
          <div class="skeleton" style="height:1.25rem;width:80%;border-radius:0.25rem"></div>
          <div class="skeleton" style="height:0.875rem;width:50%;border-radius:0.25rem"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="recipe-list--empty" style="text-align:center;padding:3rem 0">
      <p style="font-size:3rem">⚠️</p>
      <p style="color:#6b7280;margin-top:0.5rem">{{ error }}</p>
      <button style="margin-top:1rem;padding:0.5rem 1rem;background:#f97316;color:white;border:none;border-radius:0.5rem;cursor:pointer" @click="$emit('retry')">
        Попробовать снова
      </button>
    </div>

    <div v-else-if="!recipes.length" class="recipe-list--empty">
      <p style="font-size:3rem">🔍</p>
      <p style="color:#6b7280;margin-top:0.5rem">Рецепты не найдены. Попробуйте изменить запрос.</p>
    </div>

    <div v-else class="recipe-list">
      <RecipeCard v-for="recipe in recipes" :key="recipe.idMeal" :recipe="recipe" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '~/types/recipe'

defineProps<{
  recipes: Recipe[]
  loading: boolean
  error: string | null
}>()

defineEmits<{ retry: [] }>()
</script>
