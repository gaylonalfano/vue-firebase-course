// import * as firebase from "firebase/app"; // Works too
// import firebase from "@firebase/app"; // Works but sometimes can't find 'firestore' on 'firebase Namespace'
import firebase from "firebase/app"; // Works
import "firebase/firestore";
// import {
//   FirebaseFirestore,
//   QuerySnapshot,
//   CollectionReference,
//   DocumentData,
//   DocumentReference
// } from "@firebase/firestore-types";
// import { firestore } from "firebase/app"; // Nope

const firebaseConfig = {
  apiKey: "AIzaSyCNuw4lU5I53amsDHGSR0-TSGKFzsGiPzk",
  authDomain: "vue-firebase-sites-d0f55.firebaseapp.com",
  projectId: "vue-firebase-sites-d0f55",
  storageBucket: "vue-firebase-sites-d0f55.appspot.com",
  messagingSenderId: "181645635841",
  appId: "1:181645635841:web:dc06c81cf43f4b5826eb00"
};

// Initialize Firebase App connection to backend
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firestore Service
// NOTE It's this that allows us to interact with our Firestore
// to add documents, retrieve collections, etc.
const projectFirestore = firebase.firestore(firebaseApp); // Works???
// const projectFirestore: firestore = firebase.firestore(firebaseApp); // Nope

// Export it so we can import/use Firebase into other files/components
export {
  projectFirestore
  // FirebaseFirestore,
  // QuerySnapshot
  // DocumentData
  // DocumentReference
  // CollectionReference
}; // default or not, still doesn't work...
// export default projectFirestore; // No luck...
