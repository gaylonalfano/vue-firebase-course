<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length">
      <PostList :posts="posts" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts">
import PostList from "../components/PostList.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  components: { PostList },
  setup() {
    // Run our load() to fetch data
    load();

    return { posts, error };
  },
});
</script>
