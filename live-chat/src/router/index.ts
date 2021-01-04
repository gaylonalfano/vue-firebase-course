import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  NavigationGuard,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import { auth } from "@/firebase/config";
import Welcome from "@/views/Welcome.vue";
import Chatroom from "@/views/Chatroom.vue";

// Create a Route Guard (Auth Guard) function
// NOTE Going to use FB auth to grab currentUser (if available)
// NOTE Need to register this Auth Guard to Chatroom
// NOTE We add to, from, next because it aligns with beforeEnter method
// Q: How to add vue-router types so I don't have to use ts-ignore?
// A: Import from vue-router. Note difference btw expression vs. declaration syntax
function requireAuthDeclaration(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // NOTE We don't use our getUser composable because we don't need to
  // listen to AuthState changes, etc.
  let user = auth.currentUser;
  // console.log(`RouterGuard:requireAuth:user: ${user}`); // [Object object]
  console.log("RouterGuard:requireAuth:user: ", user); // Works!

  if (!user) {
    // Unauthorized (user is null) so send back to Welcome page
    next({ name: "Welcome" });
  } else {
    // Need to invoke next() to move forward
    next();
  }
}
// === Trying with alternative syntax so I can try to cast NavigationGuard
// https://github.com/vuejs/vue-router-next/blob/master/test-dts/createRouter.test-d.ts
// const requireAuthExpression: NavigationGuard = (to, from, next) => {
//   let user = auth.currentUser;
//   console.log(`RouteGuard:requireAuth:user: ${user}`);
//   next();
// }; // Works! No TS errors on to, from, next

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
    // beforeEnter: requireAuthExpression,
    beforeEnter: requireAuthDeclaration,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
