<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import Spinner from "@/components/Spinner.vue";
import getPost from "@/composables/getPost";

export default defineComponent({
  name: "PostDetails",
  components: { Spinner },
  // NOTE: With props: true, props will have "route.params" auto-registered (props: ["route.params"])
  // NOTE: You can access directly using $route.params.id or register 'id' using props: ['id']
  props: ["id"],

  // Now I can access these props via setup(props) to access
  setup(props) {
    // WITHOUT using useRoute(): Errors
    //console.log(route.params); // Error
    //console.log($route.params.id); // Error
    //console.log(props.$route.params); // Error
    // WITH using useRoute(): Works
    // Explore details of current route using useRoute()
    const route = useRoute();
    console.log(route);

    // FIXME With TS, I have to type cast 'as string' otherwise breaks.
    const { post, error, request } = getPost(route.params.id as string); // Or can use props.id too
    //const { post, error, request } = getPost(props.id); // Or can use route.params.id as string
    // console.log(post.value); // null for both approaches
    // NOTE Do I have to return 'request()' and invoke here?
    // I can get both approaches to work...
    request();
    // console.log(props.id);
    // console.log(route.params.id);

    return { post, error };
  },
});
</script>

<style>
.post {
  max-width: 1200px;
  margin: 0 40px 30px;
  padding: 10px;
}
.post h3 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: white;
  margin-bottom: 10px;
  max-width: 400px;
}
.post h3::before {
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
.post p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}
.pre {
  white-space: pre-wrap;
}
</style>
