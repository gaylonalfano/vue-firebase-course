<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="posts" />
      <TagCloud :posts="posts" />
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
import TagCloud from "@/components/TagCloud.vue";
import getPosts from "@/composables/getPosts";

export default defineComponent({
  name: "Home",
  components: { PostList, Spinner, TagCloud },
  setup() {
    // Let's destructure our getPosts()
    const { posts, error, request } = getPosts();
    // Run our request() to fetch data
    request();

    return { posts, error };
  },
});
</script>
<style>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
.layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}
</style>
