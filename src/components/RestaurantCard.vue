<script setup lang="ts">
import { computed, defineEmits } from 'vue'
import type { Restaurant } from '../types'

type PropTypes = {
  restaurant: Restaurant
}

const props = defineProps<PropTypes>()

const emits = defineEmits<{
  (e: 'delete-restaurant', restaurant: Restaurant): void
}>()

// Return full Bootstrap badge class
const statusClass = computed(() => {
  switch (props.restaurant.status) {
    case 'Want to Try':
      return 'badge bg-warning'
    case 'Recommended':
      return 'badge bg-success'
    case 'Do Not Recommend':
      return 'badge bg-danger'
    default:
      return 'badge bg-secondary'
  }
})

const deleteRestaurant = () => {
  emits('delete-restaurant', props.restaurant)
}
</script>

<template>
  <div class="card mb-3 shadow-sm">
    <div class="row g-0 align-items-center">
      
      <!-- Image -->
      <div class="col-md-3 text-center p-2">
        <img
          src="https://placehold.jp/150x150.png"
          class="img-fluid rounded"
          alt="Restaurant Image"
        />
      </div>

      <!-- Content -->
      <div class="col-md-9">
        <div class="card-body">
          <h5 class="card-title mb-1">{{ restaurant.name }}</h5>
          <p class="mb-2">
            <span :class="statusClass">{{ restaurant.status }}</span>
          </p>
          <p class="card-text mb-2">{{ restaurant.address }}</p>
          <button
            @click="deleteRestaurant"
            class="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
