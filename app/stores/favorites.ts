import { defineStore } from 'pinia'
import type { RecipeSummary } from '~/types/recipe'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [] as RecipeSummary[]
  }),

  getters: {
    ids: (state) => new Set(state.items.map((r) => r.idMeal)),
    count: (state) => state.items.length
  },

  actions: {
    toggle(recipe: RecipeSummary) {
      const idx = this.items.findIndex((r) => r.idMeal === recipe.idMeal)
      if (idx >= 0) {
        this.items.splice(idx, 1)
      } else {
        this.items.push(recipe)
      }
    },
    isFavorite(id: string) {
      return this.ids.has(id)
    }
  },

  persist: true
})
