<template>
  <div class="single-post">
    <h3>Post {{ post.id }}: {{ post.title }}</h3>
    <!-- <p>{{ post.body.substring(0, 10) + "..." }}</p> -->
    <!-- <p>{{ postSnippet }}</p> -->
    <p>{{ snippetComputed }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: ["post"],
  // If we wanted to access post.body to modify beforehand,
  // we can use setup(props) to then access props.post.body
  setup(props) {
    // const postSnippet = props.post.body.substring(0, 10) + " ...";
    // Need to use computed() if props are already reactive w/ ref()?
    // IMPORTANT: computed() is cached and it does not get re-executed
    // unless there are changes to post.body
    const snippetComputed = computed(() => {
      return props.post.body.substring(0, 50) + " ...";
    });

    return { snippetComputed };
  },
});
</script>

<style>
</style>
