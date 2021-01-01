import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNuw4lU5I53amsDHGSR0-TSGKFzsGiPzk",
  authDomain: "vue-firebase-sites-d0f55.firebaseapp.com",
  projectId: "vue-firebase-sites-d0f55",
  storageBucket: "vue-firebase-sites-d0f55.appspot.com",
  messagingSenderId: "181645635841",
  appId: "1:181645635841:web:f8c05d1a2ba5474f26eb00",
};

// Init Firebase App connection to backend
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Authentication Service
const auth = firebase.auth(); // Or, projectAuth

// Initialize Firestore Service
// NOTE It's this that allows us to interact with our Firestore
// to add documents, retrieve collections, etc.
const db = firebase.firestore(firebaseApp); // Or, projectFirestore

// Let's add a timestamp FieldValue to export to other files.
// NOTE We are storing a FUNCTION REFERENCE in timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// NOTE Later we'll add the Authentication Service

// Export it so we can import/use Firebase into other files/components
export { auth, db, timestamp };
