import { ref } from "vue";
import { auth } from "@/firebase/config";

const error = ref<string | undefined>(undefined);

async function logout() {
  // Reset the error.value in case of an error each time executed
  error.value = undefined;

  // Attempt to logout/signout
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err.message); // Default Firebase error
    error.value = err.message;
  }
}

function useLogout() {
  return { error, logout };
}

export default useLogout;
