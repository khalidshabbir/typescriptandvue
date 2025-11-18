import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { layout: 'main' },
      component: HomePage,
    },
    {
      path: "/dishes",
      name: "dishes",
      meta: { layout: 'main' },
      component: () => import("../pages/DishesPage.vue"),
    },
    {
      path: "/restaurants",
      name: "restaurants",
      meta: { layout: 'main' },
      component: () => import("../pages/RestaurantsPage.vue"),
    },
   
  ],
});

export default router;
