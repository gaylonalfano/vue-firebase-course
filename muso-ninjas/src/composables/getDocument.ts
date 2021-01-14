import { ref, watchEffect } from "vue";
import { db } from "@/firebase/config";
import {
  DocumentSnapshot,
  DocumentData,
  FirestoreError,
  DocumentReference,
} from "@firebase/firestore-types";

// Create a general purpose function to get passed collection
// Q: I believe this should be async?
function getDocument(collection: string, id: string) {
  // Create refs for document and error since they are unique to collection
  // Q: Better type for documents? If I use FS Types I get errors.
  // A: Use generic types 'object | null' and it works later when updating document.value
  const document = ref<object | null>(null);
  const error = ref<string | null>(null);

  // Create a ref for our document as well and sort
  const documentRef: DocumentReference<DocumentData> = db
    .collection(collection)
    .doc(id);

  // Let's now use onSnapshot() to add real-time listener for QuerySnapshot events
  // NOTE onNext callback returns snapshot object that contains the doc
  // NOTE We didn't chain .onSnapshot() so we can keep it more general purpose
  // use in other places in this function if needed.
  // UPDATE Storing this in const to unsubscribe from listener after a component un-mounts
  const unsubscribe = documentRef.onSnapshot(
    (doc: DocumentSnapshot<DocumentData>) => {
      console.log("snapshot"); // Keeping track of how many times the listener stacks up
      // Confirm that the 'doc' actually exists
      if (doc.exists) {
        console.log("PASSED:doc.exists");
        // We have a doc. Let's update our document.value Ref by spreading
        // ERROR: We meet again! hahah
        // SOLVED: Had to change my document Ref types to ref<object|null>(null)
        document.value = { ...doc.data(), id: doc.id };
        console.log("UPDATED:document.value: ", document.value);
        // Reset the error.value in case there was one
        error.value = null;
      } else {
        error.value = "This document does not exist.";
      }
    },
    (err: FirestoreError) => {
      // In case we get an error. We don't use try/catch with onSnapshot()
      console.log(err.message); // Internal FirestoreError
      // Reset document.value to be null
      document.value = null;
      // Update error.value
      error.value = "Could not fetch documentRef onSnapshot data.";
    }
  );

  // === Unsusbscribe to our real-time listeners when component un-mounts
  watchEffect((onInvalidate) => {
    // Unsusbscribe from prev document when watcher is stopped (component unmounted)
    // NOTE onInvalidate function runs when component un-mounts.
    onInvalidate(() => {
      // NOTE It's at THIS point that we will unsubscribe our real-time listener
      // We simply store our listener function (getDocument) into a const and re-invoke to stop.
      unsubscribe();
    });
  });

  return { document, error };
}

export default getDocument;
