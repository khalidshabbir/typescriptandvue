<script setup lang="ts">
import { ref, defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  tagline: {
    type: String,
  },
});

const navList = [
  { name: "Home", path: "/" },
  { name: "Restaurants", path: "/restaurants" },
  { name: "Dishes", path: "/dishes" },
];


const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container-fluid">

      <RouterLink to="/" class="navbar-brand">
        <img src="../assets/images/to-eat-logo.svg" alt="Logo" width="100" />
      </RouterLink>

      <button class="navbar-toggler shadow-none" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :class="{ show: isOpen }">
        <div class="navbar-nav me-auto">
          <span class="navbar-text">{{ tagline }}</span>
        </div>

        <ul class="navbar-nav ms-auto">
          <li
            class="nav-item"
            v-for="navItem in navList"
            :key="`nav-${navItem.name}`"
          >
            <RouterLink class="nav-link" :to="navItem.path">
              {{ navItem.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-text {
  margin-right: 1rem;
  font-size: 0.9rem;
  color: #555;
}
</style>
