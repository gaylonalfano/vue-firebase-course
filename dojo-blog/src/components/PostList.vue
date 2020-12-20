<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id">
      <SinglePost :post="post" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, onUpdated } from "vue";
import SinglePost from "@/components/SinglePost.vue";

export default defineComponent({
  props: ["posts"],
  components: { SinglePost },
  // OPTIONAL: Pass as arg to setup(props) to access within setup
  setup(props) {
    // console.log(props); // Proxy {posts: Proxy}
    // console.log(props.posts); // Proxy {0: {...}, 1: {...}}
    onMounted(() => console.log("component MOUNTED"));
    onUnmounted(() => console.log("component UNMOUNTED"));
    onUpdated(() => console.log("component UPDATED"));
  },
});
</script>

<style>
</style>
