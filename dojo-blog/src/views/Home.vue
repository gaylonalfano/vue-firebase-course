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
    interface Post {
      id: number;
      title: string;
      body: string;
      tags: string[];
    }

    const posts = ref<Post[]>([]);
    // Create error variable in case of error with HTTP request
    // We can return this to make it availabe in the template to display
    const error = ref<string | null>(null);

    // Now let's fetch the data from json-server
    const load = async () => {
      try {
        // Use await so it won't run the next line below. It waits.
        const data = await fetch("http://localhost:3000/posts");
        // console.log(data); // Response
        // Check that Response is NOT okay via 'ok' property
        if (!data.ok) {
          // Response isn't ok so throw an error
          // NOTE This new Error() Object will be passed into catch(err)
          throw Error("No data available at API."); // Stored in Error.message
        }

        // Let's parse the Response JSON into JS and store in posts.value
        posts.value = await data.json();
      } catch (err) {
        // We can do something now with the caught Error
        // We can even update our error ref()'s value to Error.message
        error.value = err.message;
        // Confirm that error is reactive and we've updated its value
        console.log(error.value);
      }
    };

    // Run our load() to fetch data
    load();

    return { posts, error };
  },
});
</script>
