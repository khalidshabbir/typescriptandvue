<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: 'Helping people track all the delicious things they want to eat.',
  },
  primaryButtonText: {
    type: String,
    default: 'See all food',
  },
  secondaryButtonText: {
    type: String,
    default: 'Add new food',
  },
  image: {
    type: String,
    default: '/images/pexels-andres-ayrton-square.jpg',
  },
})
</script>

<template>
  <section class="py-5 bg-light">
    <div class="container">
      <div class="row align-items-center">

        <!-- Left Column: Text -->
        <div class="col-md-6 mb-4 mb-md-0">
          <h1 class="display-5 fw-bold mb-4">{{ props.title }}</h1>
          <div class="d-flex gap-2">
            <RouterLink to="/restaurants" class="btn btn-primary">
              {{ props.primaryButtonText }}
            </RouterLink>
            <RouterLink to="/restaurants?new=true" class="btn btn-outline-secondary">
              {{ props.secondaryButtonText }}
            </RouterLink>
          </div>
        </div>

        <!-- Right Column: Image -->
        <div class="col-md-6 text-center">
          <img :src="props.image" class="img-fluid rounded shadow" alt="Hero Image" />
        </div>

      </div>
    </div>
  </section>
</template>
