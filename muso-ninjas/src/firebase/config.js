import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpdYL8KJlvU6Z3KIcHijjP660tapwN3f4",
  authDomain: "muso-ninjas-424d1.firebaseapp.com",
  projectId: "muso-ninjas-424d1",
  storageBucket: "muso-ninjas-424d1.appspot.com",
  messagingSenderId: "1018236482277",
  appId: "1:1018236482277:web:41774e8772d78998fa9a0c",
};

// === Init Firebase App connection to backend
const firebaseApp = firebase.initializeApp(firebaseConfig);

// === Init Services
// Initialize Authentication Service
const auth = firebase.auth(); // Or, projectAuth

// Initialize Firestore Service
// NOTE It's this that allows us to interact with our Firestore
// to add documents, retrieve collections, etc.
const db = firebase.firestore(firebaseApp); // Or, projectFirestore

// Initialize Firebase Storage Service
const storage = firebase.storage();

// === Timestamp
// Let's add a timestamp FieldValue to export to other files.
// NOTE We are storing a FUNCTION REFERENCE in timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// Export it so we can import/use Firebase into other files/components
export { auth, db, storage, timestamp };
