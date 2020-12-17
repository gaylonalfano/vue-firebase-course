<template>
  <div class="home">
    <h1>Home</h1>
    <PostList v-if="showPosts" :posts="posts" />
    <button @click="togglePosts">Toggle posts</button>
    <button @click="deletePost">Delete a post</button>
  </div>
</template>

<script lang="ts">
import PostList from "../components/PostList.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  components: { PostList },
  setup() {
    interface Post {
      title: string;
      body: string;
      id: number;
    }

    const posts = ref<Post[]>([
      {
        title: "welcome to the end",
        body:
          "Ni hao, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem molestiae praesentium dolore aperiam et vel accusamus modi excepturi magni sapiente quis, odio earum deleniti quibusdam dignissimos neque! Facilis, officiis.",
        id: 1,
      },
      {
        title: "top 5 CSS tips",
        body:
          "Voluptatibus quidem molestiae praesentium dolore aperiam et vel accusamus modi excepturi magni sapiente quis, odio earum deleniti quibusdam dignissimos neque! Facilis, officiis.",
        id: 2,
      },
    ]);

    // Add reactive property to toggle displaying our PostList component
    const showPosts = ref<boolean>(true);

    // Handler for togglePosts. Need computed()? or will a simple fn work?
    // NOTE I believe I just need a standard func based on other examples.
    // NOTE Don't forget to return this so it can be used in template
    const togglePosts = () => {
      showPosts.value = !showPosts.value;
    };

    // Could add directly in template but going this approach. Need to return it
    const deletePost = () => {
      posts.value.pop();
    };

    // Return posts so now accessible inside template and as props
    // for other components!
    return { posts, showPosts, togglePosts, deletePost };
  },
  mounted() {
    console.log("mounted using OPTIONS API");
  },
});
</script>
