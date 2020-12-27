<template>
  <div class="tag">
    <h1>Tag: {{ tag }}</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length">
      <PostList :posts="postsValueComputed" />
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import PostList from "@/components/PostList.vue";
import Spinner from "@/components/Spinner.vue";
import TagCloud from "@/components/TagCloud.vue";
import getPosts from "@/composables/getPosts";

export default defineComponent({
  name: "Tag",
  props: ["tag"],
  components: { PostList, Spinner, TagCloud },
  setup(props) {
    // Let's get our posts via GET request
    const { posts, error, request } = getPosts();
    request();
    console.log(posts); // RefImpl with _value of posts. Good.
    console.log(posts.value); // Proxy {} with empty Array(0)! Hmmm...

    // Now let's filter posts based on our current route tag /tags/:tag
    // Q: Could just use props.tag instead or must I use useRoute()?
    // A: If I use props.tag, then I must use computed()!
    // A: route.params.tag works too!
    // const tempTag = props.tag; // Error. props in setup() will lose reactivity!
    // const tempTag = computed(() => props.tag); // Works!
    const route = useRoute();
    // Q: Should I store route.params.tag as a value now? Or pass directly when needed?
    // A: Both seem to work, but I think passing directly when needed may be more reactive?
    // const currentTag = route.params.tag as string; // Works too!

    // Let's filter our posts based on our tag
    // FIXME Keep getting an empty array!
    // const filteredPosts = posts.value.filter((post) => {
    //   return post.tags.includes("news"); // BROKEN!
    // });
    // console.log(filteredPosts); // []

    // Verbose with EXPLICIT return:
    // const postsValueComputed = computed(() => {
    //   return posts.value.filter((post) => {  // Don't forget the return!
    //     // post.tags.includes(currentTag);  // Same as below.
    //     return post.tags.includes(route.params.tag as string); // Same as above
    //   });
    // });

    // Simplified with IMPLICIT return:
    const postsValueComputed = computed(() => {
      return posts.value.filter((post) =>
        post.tags.includes(route.params.tag as string)
      );
    });
    console.log(postsValueComputed); // ComputedRefImpl but _value is empty
    console.log(postsValueComputed.value); // [] or undefined if return is in inner (return post.tags.includes(tempTag))

    // const postsComputed = computed(() => {
    //   return posts.filter((post) => {
    //     // Error. Must use .value
    //     post.tags.includes(currentTag);
    //   });
    // });
    // console.log(postsComputed); // ComputedRefImpl but _value is empty
    // console.log(postsComputed.value); // [] or undefined if return is in inner (return post.tags.includes(tempTag))

    return { posts, error, postsValueComputed };
  },
});
</script>

<style>
</style>
