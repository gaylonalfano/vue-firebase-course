import { ref } from "vue";
import { auth } from "@/firebase/config";

// Create an error Ref. Just once! Don't declare inside useSignup()!
const error = ref<string | null>(null);

// Create a signup function to do the actual signing up of users
// NOTE this function returns Promise<void | firebase.auth.UserCredential>
// but you can't type it without getting errors, so best just don't type it!
async function signup(email: string, password: string, displayName: string) {
  // Reset error.value Ref to 'null' for each signup attempt
  // NOTE This resets it for the user in case their attempt fails
  error.value = null;

  // We'll use await to attempt to sign the user in using FB auth
  try {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    // Confirm we have a response object returned, or throw error
    if (!response) {
      throw new Error("Could not complete signup.");
    }
    // Log the user object
    // console.log(response);
    // console.log(response.user);

    // Let's update the displayName since it's null when first registering
    // via auth.createUserWithEmailAndPassword().
    response.user?.updateProfile({ displayName });

    // Let's reset error.value to null in case it has another value (err.message)
    error.value = null;

    // Let's return the response object so we can do other things with it.
    // NOTE response is Type firebase.auth.UserCredential
    return response;
  } catch (err) {
    console.log(err.message);
    // Update error Ref value with err.message
    error.value = err.message;
  }
}

// Creating a useSignup 'interface' of functionality so-to-speak
// NOTE No need to declare/invoke signup() inside here, as this will
// create a new version of signup() every time useSignup() is ran!
// We just need to return a reference to signup
function useSignup() {
  return { error, signup };
}

export default useSignup;
