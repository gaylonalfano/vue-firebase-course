import { ref } from "vue";
import { projectFirestore } from "@/firebase/config"; // ../firebase/config works too
// import { projectFirestore } from "@/firebase/config"; // Works
// import { projectFirestore } from "./../firebase/config";
// import { projectFirestore } from "../firebase/config"; // Works
// import * as projectFirestore from "./../firebase/config";
// import * as projectFirestore from "../firebase/config";

function getPosts() {
  const posts = ref<Record<string, any>[]>([]); // Can't leave empty or 'never'
  // Create error variable in case of error with HTTP request
  // We can return this to make it availabe in the template to display
  // Q: Use null or undefined?
  // A: I believe both work. https://youtu.be/aJdi-uEKYAc?t=1070
  const error = ref<string | undefined>(undefined);

  // Now let's fetch the data from json-server
  // NOTE Could use request:response:data pattern vs. load:data:data.json()
  const request = async (): Promise<void> => {
    try {
      // ==== Using Firestore ====
      // NOTE Here's a sample from Google collecting documents. The variable names I think hint at their Types.
      // https://github.com/googleapis/nodejs-firestore/blob/master/samples/limit-to-last-query.js
      const collectionReference = projectFirestore.collection("posts");
      const postsDocuments = await collectionReference
        .orderBy("createdAt", "desc")
        .get();
      // const postsDocumentData: Post[] = postsDocuments.docs.map(doc =>
      //   doc.data()
      // );
      // console.log(postsDocumentData); // WORKS!
      // Okay, let's try to do loop over postsDocuments and update posts.value directly
      // by returning a new Object per post using ...spread
      posts.value = postsDocuments.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      }); // WORKS!

      // // WORKS now with QuerySnapshot<Post> used for response!
      // const response: QuerySnapshot<Post> = await projectFirestore
      //   .collection("posts")
      //   .get();
      // console.log(response.docs); // .docs for the actual docs

      // // // Loop over the docs, retrieve the data using .data() and update
      // // // posts.value with these objects.
      // posts.value = response.docs.map(doc => {
      //   // Use ...spread to create a new Object
      //   // console.log(doc.data());
      //   return { ...doc.data(), id: doc.id };
      // });

      // ==== Using json-server ====
      // Simulate a delay.
      // await new Promise(resolve => {
      //   setTimeout(resolve, 2000);
      // });
      // Use await so it won't run the next line below. It waits.
      // const response = await fetch("http://localhost:3000/posts");
      // console.log(response); // Response
      // Check that Response is NOT okay via 'ok' property
      // if (!response.ok) {
      //   // Response isn't ok so throw an error
      //   // NOTE This new Error() Object will be passed into catch(err)
      //   throw new Error("No data available at API."); // Stored in Error.message
      // }
      // Let's parse the Response JSON into JS and store in posts.value
      // const data = await response.json();
      // posts.value = data;
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
  // NOTE https://youtu.be/hOtYtLaM1fU?t=298 shows type casting of this object
  return { posts, error, request };
}

export default getPosts;
