<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="display name"
      v-model="displayName"
    />
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Sign up</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { auth } from "@/firebase/config";
import useSignup from "@/composables/useSignup";

export default defineComponent({
  name: "SignupForm",
  emits: {
    signup(currentCtxUser) {
      // Validate our payload (true if good, false is bad)
      // NOTE Can add type validation as well, etc.
      console.log("signup function payload VALIDATION: ", currentCtxUser);
      if (currentCtxUser) {
        return true;
      } else {
        return false; // invalid payload
      }
      // NOTE Can simplify using !! not not syntax
      // return !!currentCtxUser;
    },
  },
  setup(props, context) {
    // Let's access signup functionality from useSignup 'composable'
    const { error, signup } = useSignup();
    // Create Refs for our input data properties
    const displayName = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");

    // Create Signup form submit handler
    async function handleSubmit() {
      // console.log(displayName.value, email.value, password.value);
      await signup(email.value, password.value, displayName.value);
      console.log("User successfully signed up!");
      // Confirm Signup is successful then emit custom event to listen to
      // inside parent Welcome component
      if (!error.value) {
        // Let's get the current user and pass as payload in emit()
        // NOTE Keeping consistent with LoginForm context.emit('login')
        // since Welcome has user as arg for enterChatroom(currentCtxUser)
        const currentCtxUser = auth.currentUser;
        console.log("SignupForm:handleSubmit:currentCtxUser: ", currentCtxUser); // Works!
        // Emit 'signup' event and pass user as payload
        context.emit("signup", currentCtxUser);
      }
    }

    return { displayName, email, password, handleSubmit, error };
  },
});
</script>

<style>
</style>
