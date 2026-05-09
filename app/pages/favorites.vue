<template>
  <div class="page-container">
    <h1 class="section-title">❤️ Избранное</h1>

    <div v-if="!items.length" style="text-align:center;padding:4rem 0">
      <p style="font-size:4rem">🤍</p>
      <p style="color:#6b7280;margin-top:0.5rem;font-size:1.0625rem">
        У вас ещё нет избранных рецептов.
      </p>
      <NuxtLink
        to="/"
        style="display:inline-block;margin-top:1rem;padding:0.625rem 1.5rem;background:#f97316;color:white;border-radius:0.75rem;font-weight:600;text-decoration:none"
      >
        Найти рецепты
      </NuxtLink>
    </div>

    <div v-else>
      <p style="color:#6b7280;margin-bottom:1.5rem">Сохранено рецептов: {{ items.length }}</p>
      <div class="recipe-list">
        <article
          v-for="item in items"
          :key="item.idMeal"
          class="recipe-card"
          @click="navigateTo(`/recipe/${item.idMeal}`)"
        >
          <div class="recipe-card__image-wrap">
            <img :src="item.strMealThumb" :alt="item.strMeal" class="recipe-card__image" loading="lazy" />
            <span v-if="item.strCategory" class="recipe-card__badge">{{ item.strCategory }}</span>
            <button
              class="recipe-card__fav-btn recipe-card__fav-btn--active"
              title="Убрать из избранного"
              @click.stop="favStore.toggle(item)"
            >
              ❤️
            </button>
          </div>
          <div class="recipe-card__body">
            <h3 class="recipe-card__title">{{ item.strMeal }}</h3>
            <div class="recipe-card__meta">
              <span v-if="item.strArea" class="recipe-card__meta-item">🌍 {{ item.strArea }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favorites'

const favStore = useFavoritesStore()
const items = computed(() => favStore.items)

useSeoMeta({ title: 'Избранное — RecipeBook' })
</script>
