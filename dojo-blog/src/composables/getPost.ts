import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

function getPost(postId: string) {
  // Q: Do I cast to null or undefined for post?
  // A: I think both null and undefined work.
  // https://youtu.be/aJdi-uEKYAc?t=1070
  const post = ref<any | undefined>(undefined); // Can't leave empty or 'never'
  const error = ref<string | undefined>(undefined);

  const request = async (): Promise<void> => {
    try {
      // ==== Using Firestore ====
      const collectionReference = projectFirestore.collection("posts");
      const postDocument = await collectionReference.doc(postId).get();

      // post.value = postDocument.data(); // Missing id value!
      if (!postDocument.exists) {
        throw new Error("That post was not found.");
      }

      // post.value = { id: postDocument.id, ...postDocument.data() }; // Error with types
      // const postData: Post = { ...postDocument.data(), id: postDocument.id }; // Only shows type { id: string }!
      // const postData = { ...postDocument.data() }; // Type { [x: string]: any; }!
      // const postData: DocumentData = postDocument.data(); // DocumentData | undefined. Object shows up in console.
      // const postData: DocumentData = postDocument.data()!; // WORKS! Now only type DocumentData
      // const postData: DocumentData = postDocument!.data()!; // WORKS like above! Now only type DocumentData
      // post.value = {
      //   id: postDocument.id, // Remember to use postDocument.id
      //   title: postData.title,
      //   body: postData.body,
      //   tags: postData.tags
      // };
      post.value = { id: postDocument.id, ...postDocument.data()! }; // Works with '!' non-null & DocumentData=Post
      // console.log(postData);
      console.log(post.value);

      // Shaun's syntax: Works without Types
      // const res = await projectFirestore
      //   .collection("posts")
      //   .doc(postId)
      //   .get();

      // post.value = { ...res.data(), id: res.id };
      // console.log(post.value);
      // // ==== Using json-server ====
      // // Simulate a delay.
      // // await new Promise(resolve => {
      // //   setTimeout(resolve, 2000);
      // // });

      // // Use await so it won't run the next line below. It waits.
      // const response = await fetch(`http://localhost:3000/posts/${postId}`);
      // // console.log(response); // Response

      // // Check that Response is NOT okay via 'ok' property
      // if (!response.ok) {
      //   throw new Error("That post was not found.");
      //   // Response isn't ok so throw an error
      //   // NOTE This new Error() Object will be passed into catch(err)
      // }

      // // Let's parse the Response JSON into JS and store in post.value
      // const data = await response.json();
      // post.value = data;
    } catch (err) {
      // We can do something now with the caught Error
      // We can even update our error ref()'s value to Error.message
      error.value = err.message;
      // Confirm that error is reactive and we've updated its value
      console.log(error.value);
    }
  };

  // NOTE When I invoke here, it works but get TS error in PostDetails.vue
  // NOTE It's standard practice to just return the function reference
  // instead of invoking inside. More flexibility.
  // request();

  return { post, error, request };
}

export default getPost;
