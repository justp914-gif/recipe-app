import type { Recipe, RecipeSummary, MealDBResponse } from '~/types/recipe'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export class MealDbService {
  private static instance: MealDbService
  private cache = new Map<string, unknown>()

  static getInstance(): MealDbService {
    if (!MealDbService.instance) {
      MealDbService.instance = new MealDbService()
    }
    return MealDbService.instance
  }

  private async fetch<T>(path: string): Promise<T> {
    if (this.cache.has(path)) {
      return this.cache.get(path) as T
    }
    const res = await $fetch<T>(`${BASE_URL}${path}`)
    this.cache.set(path, res)
    return res
  }

  async searchByName(query: string): Promise<Recipe[]> {
    const data = await this.fetch<MealDBResponse<Recipe>>(`/search.php?s=${encodeURIComponent(query)}`)
    return data.meals ?? []
  }

  async getById(id: string): Promise<Recipe | null> {
    const data = await this.fetch<MealDBResponse<Recipe>>(`/lookup.php?i=${id}`)
    return data.meals?.[0] ?? null
  }

  async filterByCategory(category: string): Promise<RecipeSummary[]> {
    const data = await this.fetch<MealDBResponse<RecipeSummary>>(`/filter.php?c=${encodeURIComponent(category)}`)
    return data.meals ?? []
  }

  async filterByArea(area: string): Promise<RecipeSummary[]> {
    const data = await this.fetch<MealDBResponse<RecipeSummary>>(`/filter.php?a=${encodeURIComponent(area)}`)
    return data.meals ?? []
  }

  async getCategories(): Promise<string[]> {
    const data = await this.fetch<{ categories: { strCategory: string }[] }>('/categories.php')
    return data.categories.map((c) => c.strCategory)
  }

  async getAreas(): Promise<string[]> {
    const data = await this.fetch<MealDBResponse<{ strArea: string }>>('/list.php?a=list')
    return (data.meals ?? []).map((a) => a.strArea)
  }

  async getRandomMeals(count = 12): Promise<Recipe[]> {
    const requests = Array.from({ length: count }, () =>
      this.fetch<MealDBResponse<Recipe>>('/random.php')
    )
    const results = await Promise.all(requests)
    const seen = new Set<string>()
    return results
      .flatMap((r) => r.meals ?? [])
      .filter((m) => {
        if (seen.has(m.idMeal)) return false
        seen.add(m.idMeal)
        return true
      })
  }

  getIngredients(recipe: Recipe): { ingredient: string; measure: string }[] {
    const items: { ingredient: string; measure: string }[] = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`]
      const measure = recipe[`strMeasure${i}`]
      if (ingredient && ingredient.trim()) {
        items.push({ ingredient: ingredient.trim(), measure: (measure ?? '').trim() })
      }
    }
    return items
  }
}
