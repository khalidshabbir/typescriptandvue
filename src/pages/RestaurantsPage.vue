<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import RestaurantForm from '../components/RestaurantFrom.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import SideMenu from '../components/SideMenu.vue'
import type { Restaurant } from '../types'
import { useRestaurantStore } from '../stores/RestaurantStore'

const restaurantStore = useRestaurantStore()
const restaurantList = restaurantStore.list

const filterText = ref('')
const showNewForm = ref(false)

const filteredRestaurantList = computed((): Restaurant[] => {
  return restaurantList.filter((restaurant) => {
    if (restaurant.name) {
      return restaurant.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return restaurantList
    }
  })
})

const numberOfRestaurants = computed(() => filteredRestaurantList.value.length)

const addRestaurant = (payload: Restaurant) => {
  restaurantStore.addRestaurant(payload)
  hideForm()
}

const hideForm = () => {
  showNewForm.value = false
}

onMounted(() => {
  const route = useRoute()
  if (route.query.new) {
    showNewForm.value = true
  }
})
</script>

<template>
  <main class="container my-5">
    <h4 class="mb-4">This is the Restaurants Page</h4>

    <div class="row">
      <!-- Side Menu -->
      <div class="col-md-3 mb-4">
        <SideMenu />
      </div>

      <!-- Main Content -->
      <div class="col-md-9">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1 class="h3">Restaurants</h1>
          <button class="btn btn-success" @click="showNewForm = true" v-if="!showNewForm">
            New
          </button>
        </div>

        <div v-if="!showNewForm" class="d-flex flex-wrap align-items-center gap-2 mb-4">
          <p class="mb-0">
            <strong>{{ numberOfRestaurants }}</strong> restaurants
          </p>

          <div class="input-group ms-auto" style="max-width: 300px;">
            <input type="text" class="form-control" placeholder="Restaurant name" v-model="filterText" />
            <button class="btn btn-outline-secondary" type="button">Search</button>
          </div>
        </div>

        <RestaurantForm v-if="showNewForm" @add-new-restaurant="addRestaurant" @cancel-new-restaurant="hideForm" />

        <div v-else class="row g-3">
          <div
            v-for="item in filteredRestaurantList"
            :key="`item-${item.name}`"
            class="col-12"
          >
            <RestaurantCard :restaurant="item" @delete-restaurant="restaurantStore.deleteRestaurant(item)" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

