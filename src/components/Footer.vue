<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()

const links = [
  { name: 'Home', path: '/' },
  { name: 'Restaurants', path: '/restaurants' },
  { name: 'Dishes', path: '/dishes' },

]
</script>

<template>
  <footer class="bg-light border-top mt-5 py-4">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
      
      <div class="mb-3 mb-md-0 d-flex align-items-center gap-2">
        <img src="../assets/images/to-eat-logo.svg" width="60" alt="Logo" />
        <span class="fw-semibold">To Eat</span>
      </div>

      <ul class="nav gap-3 mb-3 mb-md-0">
        <li v-for="link in links" :key="link.name">
          <RouterLink class="text-decoration-none text-muted" :to="link.path">
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>

      <span class="text-muted small">&copy; {{ year }} To Eat. All rights reserved.</span>
    </div>
  </footer>
</template>

<style scoped>
footer a:hover {
  text-decoration: underline;
}
</style>
