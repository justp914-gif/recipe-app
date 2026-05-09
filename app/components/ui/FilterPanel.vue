<template>
  <div class="filter-panel">
    <span class="filter-panel__label">Категория:</span>
    <button
      v-for="cat in categories"
      :key="cat"
      class="filter-panel__chip"
      :class="{ 'filter-panel__chip--active': active === cat }"
      @click="emit('select', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: string[]
  active: string
}>()

const emit = defineEmits<{ select: [category: string] }>()
</script>
