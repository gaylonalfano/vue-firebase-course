import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import PostDetails from "@/views/PostDetails.vue";
import CreatePost from "@/views/CreatePost.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/post/:id",
    name: "PostDetails",
    component: PostDetails,
    props: true
  },
  {
    path: "/create",
    name: "CreatePost",
    component: CreatePost
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
