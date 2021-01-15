import { ref } from "vue";
import { db } from "@/firebase/config";

// Need ability to edit or delete a document
// NOTE Could add this to useCollection.ts but this separates
// the two - modify collections vs. modify documents.
function useDocument(collection: string, docId: string) {
  // Need error ref and document ref
  const error = ref<string | null>(null);
  const isPending = ref<boolean>(false);

  // Create async function that deletes the document using FS delete()
  async function deleteDoc(collection: string, docId: string) {
    // Reset error.value = null for every request
    error.value = null;
    isPending.value = true;

    // Try to delete using FB built-in delete() method
    try {
      const response = await db
        .collection(collection)
        .doc(docId)
        .delete();
      console.log("DELETED:deleteDoc:response: ", response);
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
      console.log("FAILED: Could not delete the document.");
    }
  }

  return { error, isPending, deleteDoc };
}

export default useDocument;
