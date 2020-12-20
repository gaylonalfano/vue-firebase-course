import { ref } from "vue";
import Post from "@/interfaces/post";

function getPost(postId: string) {
  // Q: Do I cast to null or undefined for post? A: null
  const post = ref<Post | null>(null);
  const error = ref<string | null>(null);

  const request = async (): Promise<void> => {
    try {
      // Use await so it won't run the next line below. It waits.
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      // console.log(response); // Response

      // Check that Response is NOT okay via 'ok' property
      if (!response.ok) {
        throw new Error("That post was not found.");
        // Response isn't ok so throw an error
        // NOTE This new Error() Object will be passed into catch(err)
      }

      // Let's parse the Response JSON into JS and store in post.value
      post.value = await response.json();
    } catch (err) {
      // We can do something now with the caught Error
      // We can even update our error ref()'s value to Error.message
      error.value = err.message;
      // Confirm that error is reactive and we've updated its value
      console.log(error.value);
    }
  };

  // NOTE When I invoke here, it works but get TS error in PostDetails.vue
  // request();

  return { post, error, request };
}

export default getPost;
