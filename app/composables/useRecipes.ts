import { MealDbService } from '~/services/MealDbService'
import type { Recipe, FilterState } from '~/types/recipe'

export function useRecipes() {
  const service = MealDbService.getInstance()

  const recipes = ref<Recipe[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const filters = reactive<FilterState>({
    category: '',
    area: '',
    query: ''
  })

  async function load() {
    loading.value = true
    error.value = null
    try {
      if (filters.query.trim()) {
        recipes.value = await service.searchByName(filters.query.trim())
      } else if (filters.category) {
        const summaries = await service.filterByCategory(filters.category)
        recipes.value = summaries.map((s) => ({
          idMeal: s.idMeal,
          strMeal: s.strMeal,
          strMealThumb: s.strMealThumb,
          strCategory: filters.category,
          strArea: '',
          strInstructions: '',
          strYoutube: '',
          strTags: null
        })) as Recipe[]
      } else if (filters.area) {
        const summaries = await service.filterByArea(filters.area)
        recipes.value = summaries.map((s) => ({
          idMeal: s.idMeal,
          strMeal: s.strMeal,
          strMealThumb: s.strMealThumb,
          strCategory: '',
          strArea: filters.area,
          strInstructions: '',
          strYoutube: '',
          strTags: null
        })) as Recipe[]
      } else {
        recipes.value = await service.getRandomMeals(12)
      }
    } catch {
      error.value = 'Не удалось загрузить рецепты. Попробуйте позже.'
    } finally {
      loading.value = false
    }
  }

  function setQuery(q: string) {
    filters.query = q
    filters.category = ''
    filters.area = ''
    load()
  }

  function setCategory(cat: string) {
    filters.category = cat === filters.category ? '' : cat
    filters.query = ''
    filters.area = ''
    load()
  }

  function setArea(area: string) {
    filters.area = area === filters.area ? '' : area
    filters.query = ''
    filters.category = ''
    load()
  }

  function reset() {
    filters.query = ''
    filters.category = ''
    filters.area = ''
    load()
  }

  return { recipes, loading, error, filters, load, setQuery, setCategory, setArea, reset }
}
