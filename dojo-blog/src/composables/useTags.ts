import { ref } from "vue";
import Post from "@/interfaces/post";

function useTags(posts: Post[]) {
  const tags = ref<string[]>([]);
  const tagSet = new Set<string>(); // Doesn't need to be a Ref

  // Loop through posts and add to tagSet
  // posts.forEach(post => tagSet.add(post.tags)); // Error: Adds arrays, not single tags
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag)); // Works!
  });
  console.log({ tagSet });

  // Update our tags Ref with tagSet values
  tags.value = [...tagSet]; // Or, Array.from(tagSet)

  return { tagSet, tags };
}

export default useTags;
