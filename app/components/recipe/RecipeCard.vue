<template>
  <article class="recipe-card" @click="navigateTo(`/recipe/${recipe.idMeal}`)">
    <div class="recipe-card__image-wrap">
      <img
        :src="recipe.strMealThumb"
        :alt="recipe.strMeal"
        class="recipe-card__image"
        loading="lazy"
      />
      <span v-if="recipe.strCategory" class="recipe-card__badge">{{ recipe.strCategory }}</span>
      <button
        class="recipe-card__fav-btn"
        :class="{ 'recipe-card__fav-btn--active': isFav }"
        :title="isFav ? 'Убрать из избранного' : 'В избранное'"
        @click.stop="toggleFav"
      >
        {{ isFav ? '❤️' : '🤍' }}
      </button>
    </div>

    <div class="recipe-card__body">
      <h3 class="recipe-card__title">{{ recipe.strMeal }}</h3>
      <div class="recipe-card__meta">
        <span v-if="recipe.strArea" class="recipe-card__meta-item">
          🌍 {{ recipe.strArea }}
        </span>
        <span v-if="recipe.strCategory" class="recipe-card__meta-item">
          🍽 {{ recipe.strCategory }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favorites'
import type { Recipe } from '~/types/recipe'

const props = defineProps<{ recipe: Recipe }>()

const favStore = useFavoritesStore()
const isFav = computed(() => favStore.isFavorite(props.recipe.idMeal))

function toggleFav() {
  favStore.toggle({
    idMeal: props.recipe.idMeal,
    strMeal: props.recipe.strMeal,
    strMealThumb: props.recipe.strMealThumb,
    strCategory: props.recipe.strCategory,
    strArea: props.recipe.strArea
  })
}
</script>
