<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import NewDishForm from '../components/DishForm.vue'
import DishCard from '../components/DishCard.vue'
import SideMenu from '../components/SideMenu.vue'
import type { Dish } from '../types'
import { useRoute } from 'vue-router'
import { useDishStore } from '../stores/DishStore'

const filterText = ref('')
const showNewForm = ref(false)

const dishStore = useDishStore()
const dishList = dishStore.list

const filteredDishList = computed((): Dish[] => {
  return dishList.filter((dish: Dish) => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return dishList
    }
  })
})

const numberOfDishes = computed((): number => filteredDishList.value.length)

const addDish = (payload: Dish) => {
  dishStore.addDish(payload)
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
    <div class="row">

      <SideMenu />

      <div class="col">
        <h1 class="h3 mb-4">Dishes</h1>

        <div v-if="!showNewForm" class="d-flex flex-wrap align-items-center gap-2 mb-3">
          <p class="mb-0">
            <strong>{{ numberOfDishes }}</strong> dishes
          </p>

          <button class="btn btn-success ms-auto" @click="showNewForm = true">
            New
          </button>

          <div class="input-group mt-2 mt-md-0" style="max-width: 300px;">
            <input
              type="text"
              class="form-control"
              placeholder="Dish name"
              v-model="filterText"
            />
            <button class="btn btn-outline-secondary" type="button">Search</button>
          </div>
        </div>

        <NewDishForm
          v-if="showNewForm"
          @add-new-dish="addDish"
          @cancel-new-dish="hideForm"
        />
        <div v-else class="row g-3">
          <div v-for="item in filteredDishList" :key="`item-${item.name}`" class="col-12">
            <DishCard :dish="item" @delete-dish="dishStore.deleteDish" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
