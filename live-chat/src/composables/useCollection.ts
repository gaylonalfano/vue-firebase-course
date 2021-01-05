import { ref } from "vue";
import { db } from "@/firebase/config";

// NOTE This is a more general purpose composable
// so more functionality will be declared INSIDE.
function useCollection(collection: string) {
  // NOTE Defining an error Ref INSIDE this time
  // because we will use this composable with MULTIPLE
  // collections, and for each collection we need a unique
  // error variable (if there is one). E.g. Again, since we're
  // making this composable more generic, we need separate errors
  // per collection.
  const error = ref<string | null>(null);

  // Create an async function that adds the document to collection
  async function addDoc(doc: object) {
    // Reset error.value = null for every request
    error.value = null;

    // Try to add a doc to collection
    try {
      await db.collection(collection).add(doc);
      console.log("addDoc:add:doc successful!", doc);
    } catch (err) {
      console.log(err.message);
      error.value = "Could not add document.";
    }
  }

  return { error, addDoc };
}

export default useCollection;
