import { ref } from "vue";
import Post from "@/interfaces/post";

function getPosts() {
  const posts = ref<Post[]>([]);
  // Create error variable in case of error with HTTP request
  // We can return this to make it availabe in the template to display
  const error = ref<string | null>(null);

  // Now let's fetch the data from json-server
  // NOTE Could use request:response:data pattern vs. load:data:data.json()
  const request = async (): Promise<void> => {
    try {
      // Simulate a delay.
      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });

      // Use await so it won't run the next line below. It waits.
      const response = await fetch("http://localhost:3000/posts");
      // console.log(response); // Response
      // Check that Response is NOT okay via 'ok' property
      if (!response.ok) {
        // Response isn't ok so throw an error
        // NOTE This new Error() Object will be passed into catch(err)
        throw new Error("No data available at API."); // Stored in Error.message
      }

      // Let's parse the Response JSON into JS and store in posts.value
      const data = await response.json();
      posts.value = data;
    } catch (err) {
      // We can do something now with the caught Error
      // We can even update our error ref()'s value to Error.message
      error.value = err.message;
      // Confirm that error is reactive and we've updated its value
      console.log(error.value);
    }
    // Don't load directly in here! Instead invoke in component(s)
    // TODO ? Why?
    // request();
  };
  // Let's package it all up and return in an Object
  return { posts, error, request };
}

export default getPosts;
