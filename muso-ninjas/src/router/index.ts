import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import { auth } from "@/firebase/config";
import Home from "@/views/Home.vue";
import Login from "@/views/auth/Login.vue";
import Signup from "@/views/auth/Signup.vue";
import CreatePlaylist from "@/views/playlists/CreatePlaylist.vue";

// Create a Route Guard (Auth Guard) function
// NOTE Going to use FB auth to grab currentUser (if available)
// NOTE Need to register this Auth Guard to CreatePlaylist
// NOTE We add to, from, next because it aligns with beforeEnter method
// Q: How to add vue-router types so I don't have to use ts-ignore?
// A: Import from vue-router. Note difference btw expression vs. declaration syntax
function requireAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // NOTE We don't use our getUser composable because we don't need to
  // listen to AuthState changes, etc.
  let user = auth.currentUser;
  // console.log(`RouteGuard:requireAuth:user: ${user}`); // [Object object]
  console.log("RouteGuard:requireAuth:user: ", user); // Works!

  if (!user) {
    // Unauthorized (user is null) so send back to Login page
    next({ name: "Login" });
  } else {
    // Need to invoke next() to move forward
    next();
  }
}
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/playlists/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
