<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length">
      <PostList :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PostList from "@/components/PostList.vue";
import Spinner from "@/components/Spinner.vue";
import getPosts from "@/composables/getPosts";

export default defineComponent({
  name: "Home",
  components: { PostList, Spinner },
  setup() {
    // Let's destructure our getPosts()
    const { posts, error, request } = getPosts();
    // Run our request() to fetch data
    request();

    return { posts, error };
  },
});
</script>
