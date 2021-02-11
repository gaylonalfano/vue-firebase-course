import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// HTTP Request 1
export const randomNumber = functions.https.onRequest(
    (request: functions.Request, response: functions.Response) => {
    // The HTTP handler runs when request is made to the randomNumber function
      const number = Math.round(Math.random() * 100);
      // console.log(number); // Gets added to FB Functions > Logs tab.
      response.send(number.toString());
    }
);

// HTTP Request 2
export const redirectToMySite = functions.https.onRequest(
    (request, response) => {
    // Use the response.redirect()
      response.redirect("https://www.gaylonalfano.com");
    }
);

// HTTP Callable (can invoke directly from within)
export const sayHello = functions.https.onCall(
    (data: any, context: functions.https.CallableContext) => {
    // Callables need to have a return unlike onRequest triggers
    // UPDATE: We can now interact with 'data' object
      return `hello, ${data.name}`;
    }
);
