<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import getPost from "@/composables/getPost";

export default defineComponent({
  name: "PostDetails",
  // NOTE: With props: true, props will have "route.params" auto-registered (props: ["route.params"])
  // NOTE: You can access directly using $route.params.id or register 'id' using props: ['id']
  props: ["id"],

  // Now I can access these props via setup(props) to access
  setup(props) {
    const { post, error, request } = getPost(props.id);
    // console.log(post.value); // null for both approaches
    // NOTE Do I have to return 'request()' and invoke here?
    // I can get both approaches to work...
    request();

    return { post, error };
  },
});
</script>

<style>
.post {
  max-width: 1200px;
  margin: 0 auto;
}
.post p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}
.pre {
  white-space: pre-wrap;
}
</style>
