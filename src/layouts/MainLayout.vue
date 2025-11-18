<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <div>
    <Navbar />
    <main class="page-wrapper">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.page-wrapper {
  padding: 20px;
}
</style>
