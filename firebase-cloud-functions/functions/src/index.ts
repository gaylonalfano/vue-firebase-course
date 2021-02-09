import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// HTTP request 1
export const randomNumber = functions.https.onRequest((request, response) => {
  // The HTTP handler will run when request is made to the randomNumber function
  const number = Math.round(Math.random() * 100);
  // console.log(number); // Gets added to FB Functions > Logs tab.
  response.send(number.toString());
});

// HTTP request 2
export const redirectToMySite = functions.https.onRequest(
    (request, response) => {
    // Use the response.redirect()
      response.redirect("https://www.gaylonalfano.com");
    }
);
