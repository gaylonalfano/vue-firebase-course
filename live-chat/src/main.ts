import { createApp, ComponentPublicInstance } from "vue";
import App from "./App.vue";
import router from "./router";
import { auth } from "@/firebase/config";

import "@/assets/main.css";

// === Original default
// createApp(App)
//   .use(router)
//   .mount("#app");

// NOTE: Wait to create App and mount to DOM until FB auth initializes
// by listening for the first/initial auth.onAuthStateChanged event.
// This tells us we have now established a connection to Firebase backend.
// Q: What is the type for a Vue app?
// A: ComponentPublicInstance. I tried DefineComponent but didn't work.
let app: ComponentPublicInstance;

auth.onAuthStateChanged(() => {
  // Check that we have an app. We only run this inner code ONCE to create our app
  // All other times (e.g, user signed out, login, etc.) it doesn't run inner code.
  if (!app) {
    // If not, create it and mount to DOM
    app = createApp(App)
      .use(router)
      .mount("#app");
  }
});
