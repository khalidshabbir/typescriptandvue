<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

interface Dish {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

const dishes = ref<Dish[]>([]);
const searchQuery = ref("");

const fetchDishes = async () => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    dishes.value = response.data.meals || [];
  } catch (error) {
    console.error("Error fetching dishes:", error);
  }
};

onMounted(() => {
  fetchDishes();
});

const filteredDishes = computed(() => {
  if (!searchQuery.value) return dishes.value;
  return dishes.value.filter((d) =>
    d.strMeal.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-4 text-center">Dishes</h1>

    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control shadow-none"
        placeholder="Search dish..."
      />
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <div class="col" v-for="dish in filteredDishes" :key="dish.idMeal">
        <div class="card h-100 shadow-sm">
          <img :src="dish.strMealThumb" class="card-img-top" :alt="dish.strMeal" />
          <div class="card-body">
            <h5 class="card-title">{{ dish.strMeal }}</h5>
            <p class="card-text"><strong>Category:</strong> {{ dish.strCategory }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
