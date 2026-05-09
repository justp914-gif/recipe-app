export interface Recipe {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strYoutube: string
  strTags: string | null
  [key: string]: string | null
}

export interface RecipeSummary {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory?: string
  strArea?: string
}

export interface MealDBResponse<T> {
  meals: T[] | null
}

export interface FilterState {
  category: string
  area: string
  query: string
}
