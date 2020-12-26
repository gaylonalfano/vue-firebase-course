<template>
  <div class="single-post">
    <router-link :to="{ name: 'PostDetails', params: { id: post.id } }">
      <h3>{{ post.title }}</h3>
    </router-link>
    <!-- <p>{{ post.body.substring(0, 10) + "..." }}</p> -->
    <!-- <p>{{ postSnippet }}</p> -->
    <p>{{ snippetComputed }}</p>
    <span v-for="tag in post.tags" :key="tag">
      <router-link :to="{ name: 'Tag', params: { tag: tag } }">
        #{{ tag }}
      </router-link>
    </span>
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
    // Need to use computed() if props are already reactive w/ ref()? YES!
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
.single-post {
  margin: 0 40px 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
}
.single-post h3 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: white;
  margin-bottom: 10px;
  max-width: 400px;
}
.single-post h3::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1deg);
}
</style>
