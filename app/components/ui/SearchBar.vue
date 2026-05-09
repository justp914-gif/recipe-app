<template>
  <form class="search-bar" @submit.prevent="emit('search', query)">
    <input
      v-model="query"
      class="search-bar__input"
      type="search"
      placeholder="Найти рецепт..."
      :value="modelValue"
      @input="query = ($event.target as HTMLInputElement).value"
    />
    <button type="submit" class="search-bar__btn">
      <span>🔍</span>
      <span>Найти</span>
    </button>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ search: [query: string] }>()

const query = ref(props.modelValue ?? '')

watch(() => props.modelValue, (v) => { query.value = v ?? '' })
</script>
