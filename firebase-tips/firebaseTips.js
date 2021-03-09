// https://youtu.be/iWEgpdVSZyg?t=513
// ======== CREATE TWO PROJECTS: DEV PROD ======
// You can link to multiple projects (myapp-dev, myapp-prod)
// In PROD project, add Google Analytics
// Assign roles using Principle of Least Privilege
// Add contact info to Data Privacy tab for GDPR
// Use Blaze tier but set budget limit!
// Install Firebase Tools and Google Cloud SDK (firebase, gcloud)
//  

// ======== HOSTING & DISTRIBUTION =========
// If making mobile app use App Distribution
// Use NPM scripts to run firebase command in package.json
{
  "scripts": {
    "test": "test-cmd",
    "build": "build-cmd"
  }
}
// Use --project flag for scripts
{
  "scripts": {
    "test": "test-cmd",
    "build": "build-cmd",
    "deploy-dev": "firebase deploy --project myapp-dev",
    "deploy-prod": "firebase deploy --project myapp-prod"
  }
}

// Use a web.app domain
// Can share same FB Project and host multiple web apps with Multisite hosting (www.site.com and admin.site.com)
// Then inside firebase.json point routes to Cloud Functions or Cloud Run
// Point routes to Dynamic Links for best UX
{
  "hosting": [
    {
      "target": "admin",
      "public": "dist"
    },
    {
      "public": "public",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "rewrites": [
        {
          "source": "/some-path",
          "function": "my-cloud-function"
        },
        {
          "source": "/offers/**",
          "dynamicLinks": true
        }
      ]
    }
  ]
}

// Can use Google Cloud Build for CI/CD

// ======== DATABASES & BACKUP =========
// Firestore usually unless have lots of writes (IoT device)
// Set up dedicated Cloud Storage Bucket for backups myapp-dev-backups
// and backup w/ single command $ gcloud beta firestore export gs://[BUCKET_NAME]
// Start with Locked Mode

// ======== DATA MODELING ========
// === 1:1
async function oneToOne() {
  // Eg Authors - Accounts
  // Get a userID
  const { uid } = await auth.currentUser;

  // Use it as a Firestore DocID
  const ref = db.collection("accounts").doc(uid);

  // Set it and use merge for non-destructive writes
  return ref.set({ someData }, { merge: true });
}

// === 1:n
async function oneToMany() {
  // Eg. Authors - Books via subcollection
  // Get a userID
  const { uid } = await auth.currentUser;

  const ref = db.collection("accounts").doc(uid).collection("orders");

  return ref.add({ someData });
}

// Sometimes you want to query ALL orders across ALL users in db
db.collectionGroup("orders").orderBy("date").where();

// === m:n
async function manyToMany() {
  // Eg. Users - Chats (Group chat)
  // Many-to-many with an embedded Map
  // Get a userID
  const { uid, displayName } = await auth.currentUser;

  const ref = db.collection("chats");

  // Can associate multiple users with multiple chats by embedding
  // userIDs on the Chat document using a Map of k:v pairs
  const members = {
    [uid]: displayName,
  };

  // Duplicate data for fast reads
  ref.set({ members }, { merge: true });
}

// Now that we have a Map object on the document, we can query
// it using dot notation
const query = db.collection("chats").orderBy("members.gaylona123");

// Now we have a model a query. Time to decide if we want realtime or not
// Single Read (not realtime)
query.get();
// Realtime - Can listen to 'added', 'modified', or 'removed' docChanges()
query.onSnapshot((q) => q.docChanges().map((change) => change.type));

// Can also work OFFLINE
db.enablePersistence({ synchronizeTabs: true });

// ===== Reading, writing, etc.
// Write to lists with array union or remove
const ref = db.collection("recipes");
ref.add({
  ingredients: ["sugar", "milk"],
});
ref.update({
  // Use arrayUnion() to ensure no duplicates (like a Python Set)
  ingredients: firebase.firestore.FieldValue.arrayUnion("pineapple"),
  ingredients: firebase.firestore.FieldValue.arrayRemove("milk"),
});

// Query a list with array-contains
ref.where("ingredients", "array-contains", "avacado");

// Pipeline multiple reads into a concurrent request
const idsOfOtherDocs = ["a", "b", "c"];

const readIdsOfOtherDocs = (idsOfOtherDocs) => {
  // Create an array of Promises that get the actual docs
  const reads = idsOfOtherDocs.map((id) => db.collection("foo").doc(id).get());
  // Then run them all together using Promise.all()
  return Promise.all(reads);
};

// ===== MISC
// Use a NodeJS service for user management?
// Break up Functions index.js file into smaller files using import/export

// ======== SECURITY =========
// Use the simulator to mock requests to db

// ======== CLOUD STORAGE =======
// Eg images, videos, raw files, etc
// Use Coldline buckets to save $ on storage (i.e., myapp-dev-backups)
// Use fromURL to access a ref by downloadURL
const storageRef = storage.refFromURL("gs://myapp-dev.appspot.com/foo.jpg");
// List all files in a bucket
async function listAllFiles() {
  // Make a ref to the path of the directory
  const storageRef = storage.ref("images/gaylona123");
  // Then use listAll() to get all files
  const allFiles = await storageRef.listAll();
}

// Calculate progress with the snapshot data
const storageRef = storage.ref("image.png");
const task = storageRef.put(someBlob);
task.on(firebase.storage.TaskEvent.STATE_CHANGED, (e) => {
  const progress = e.bytesTransferred / e.totalBytes;
});

// Upload multiple files concurrently
const files = [...Array(20).keys()];

for (const f of files) {
  // Save the files and some custom metadata
  storage.ref(f).put(someFile, { customMetadata: { userID, platform } });
}
// Use the image resizer extension if you allow users to upload images

// ========= ADMIN SDK ===========
// Create an admin script with Node.js
// Keep your service account private (add service-account.json in .gitignore)
// Seed the database with dummy data using Faker (npm i faker -D)
// Example admin.js seeding
const admin = require("firebase-admin");
admin.initializeApp();

const faker = require("faker");
const db = admin.firestore();

for (const i of [...Array(10).keys()]) {
  db.collection("people").add({
    name: faker.name.firstName(),
    avatar: faker.image.avatar(),
  });
}
// ***Then run this script with node: $ node admin.js

// ========= REST ==========
// You can backup Firestore from command line, but REST allows this too for CRON jobs
// Use REST combined with googleapis package

// ========= CLOUD FUNCTIONS ========
// Use TypeScript
// Use global variables e.g, const db = admin.firestore();
// Write idempotent code e.g. functions/src/index.ts:
import * as functions from "firebase-functions";

export const helloWorld = functions.firestore
  .document("")
  .onCreate((snap, context) => {
    context.eventId;
  });

// Add more horsepower to your functions using runWith()
import * as functions from "firebase-functions";

export const helloWorld = functions
  .runsWith({ memory: "2GB", timeoutSeconds: 540 })
  .firestore.document("")
  .onCreate((snap, context) => {
    context.eventId;
  });

// Avoid infinite loops e.g.,
import * as functions from "firebase-functions";

// BAD
export const helloWorld = functions.firestore
  .document("user/{userId}")
  // Accidentally update the same doc that triggered the event! DON'T DO THIS!
  .onWrite((snap, context) => {
    return snap.ref.update({ forever: true });
  });

// GOOD
export const helloWorld = functions.firestore
  .document("user/{userId}")
  .onWrite((snap, context) => {
    // Check equality between documents
    if (snap.after.isEqual(snap.before)) {
      return;
    }
    return snap.ref.update({ forever: true });
  });

// Always return Promises from backend triggers
export const helloWorld = functions.firestore
  .document("user/{userId}")
  // Add async/await
  .onWrite(async (snap, context) => {
    await Promise.resolve();
    return;
  });

// ==== Cloud Functions that commmunicate with other Cloud Functions
// or GCP Services
// Prefer PubSub for internal functions, e.g.:
// OKAY
export const soFun = functions.https.onRequest((req, res) => {
  // TODO Validate request
  res.send("This is so fun!");
});
// BETTER - Easier and more secure way to talk with other internal services vs HTTP endpoint
export const soFun = functions.pubsub.topic("hello").onPublish((message) => {
  return "This is even better!";
});

// Prefer Callable functions for user authentication
// OKAY: Regular HTTP Function example
export const soFun = functions.https.onRequest(async (req, res) => {
  const header = req.headers.authorization as string;

  const user = await auth.verifyIdToken(header);

  if (user.uid) {
    res.send('So fun!')
  }
})
// BETTER: Use Callable functions to simplify. It includes auth context
// So you don't have to add middleware to authenticate your functions
export const soFun = functions.https.onCall(async (data, context) => {

  const user = context.auth;

  if (user) {
    return 'Even better!'
  }
})
// E.g. Want to delete an entire collection (and its subcollections)
export const soFun = functions.https.onCall(async (data, context) => {

  const user = context.auth;
  const collectionPath = data.collection;

  // Create a recursive function
  const batchDelete: any = async () => {
    const snapshots = await db.collection(collectionPath).limit(100).get();

    if (snapshot.size === 0) return;

    const batch = db.batch();
    snapshots.docs.forEach(doc => batch.delete(doc.ref))

    await batch.commit();

    return batchDelete();
  }

  // Authorize the operation by looking at the user ID
  if (user && collectionPath) {
    batchDelete()
  }
})

// Deploy single functions instead of all at once
// $ firebase deploy --only functions:someFunction

// Test functions from the shell
// Customize logging with StackDriver


// ======= ANALYTICS ========
// Track custom events and user properties
const analytics = firebase.analytics();

function onLogin() {
  // Login

  analytics.logEvent('signin', { method: 'askjeeves' })
  analytics.setUserProperties({ awesome: true })
}

// Build Audiences inside FB Console (Marketing, A/B testing, etc)
// Use Audiences to customize your app with Remote Config and underlying analytics data
// Use Cloud Messaging to push notifications to specific users
// Sprinkle in some Machine Learning (ML Kit, AutoML, image labeling, face detection, etc.)

