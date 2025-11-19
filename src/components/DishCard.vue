<script setup lang="ts">
import { computed } from 'vue'
import type { Dish } from '../types'

type PropTypes = {
  dish: Dish
}

const props = defineProps<PropTypes>()

const emit = defineEmits<{
  (e: 'delete-dish', dish: Dish): void
}>()

// Return full Bootstrap badge class based on status
const statusClass = computed(() => {
  switch (props.dish.status) {
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

const deleteDish = () => {
  emit('delete-dish', props.dish)
}
</script>

<template>
  <div class="card mb-3 shadow-sm">
    <div class="row g-0 align-items-center">

      <div class="col-md-3 text-center p-2">
        <img
          src="https://placehold.jp/150x150.png"
          class="img-fluid rounded"
          alt="Dish Image"
        />
      </div>

      <!-- Content -->
      <div class="col-md-9">
        <div class="card-body">
          <h5 class="card-title mb-1">{{ dish.name }}</h5>
          <p class="mb-2">
            <span :class="statusClass">{{ dish.status }}</span>
          </p>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-warning">Edit</button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteDish">Delete</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
