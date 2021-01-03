import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import { auth } from "@/firebase/config";
import Welcome from "@/views/Welcome.vue";
import Chatroom from "@/views/Chatroom.vue";

// Create a Route Guard (Auth Guard) function
// NOTE Going to use FB auth to grab currentUser (if available)
// NOTE Need to register this Auth Guard to Chatroom
// function requireAuth(to, from, next): NavigationGuard<RouteRecordRaw> {
//   // NOTE We don't use our getUser composable because we don't need to
//   // listen to AuthState changes, etc.
//   let user = auth.currentUser;
//   console.log(`Current user in Auth Guard: ${user}`);
// }

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: Chatroom,
    // Need to register our Auth Guard as a reference
    // beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
