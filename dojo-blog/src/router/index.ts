import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import PostDetails from "@/views/PostDetails.vue";
import CreatePost from "@/views/CreatePost.vue";
import Tag from "@/views/Tag.vue";
import RealTime from "@/views/RealTime.vue";

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
  },
  {
    path: "/tags/:tag",
    name: "Tag",
    component: Tag,
    props: true
  },
  {
    path: "/realtime",
    name: "RealTime",
    component: RealTime
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
