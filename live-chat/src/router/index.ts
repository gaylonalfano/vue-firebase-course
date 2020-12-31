import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Welcome from "@/views/Welcome.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
