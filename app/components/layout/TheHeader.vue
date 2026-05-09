<template>
  <header class="header">
    <div class="header__inner">
      <NuxtLink to="/" class="header__logo">
        <span class="header__logo-icon">🍳</span>
        <span>RecipeBook</span>
      </NuxtLink>

      <nav class="header__nav">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="header__nav-link"
          :class="{ 'header__nav-link--active': route.path === link.to }"
        >
          <span>{{ link.icon }}</span>
          <span>{{ link.label }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const navLinks = [
  { to: '/', label: 'Главная', icon: '🏠' },
  { to: '/categories', label: 'Категории', icon: '📂' },
  { to: '/favorites', label: 'Избранное', icon: '❤️' }
]
</script>
