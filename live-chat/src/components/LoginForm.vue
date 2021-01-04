<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { auth } from "@/firebase/config";
import useLogin from "@/composables/useLogin";

export default defineComponent({
  name: "LoginForm",
  emits: {
    login(currentCtxUser) {
      // Validate our payload (true if good, false is bad)
      // NOTE Can add type validation as well, etc.
      // console.log("login function PAYLOAD: ", currentCtxUser);
      // if (currentCtxUser) {
      //   return true;
      // } else {
      //   return false; // invalid payload
      // }
      // Can simplify using !! not not syntax
      return !!currentCtxUser;
    },
  },
  setup(props, context) {
    // Let's use our useLogin composable functionality
    const { error, login } = useLogin();
    // Create Refs for our input data properties
    const email = ref<string>("");
    const password = ref<string>("");

    // Create Signup form submit handler
    // NOTE Need to change to async when using useLogin login()
    async function handleSubmit() {
      // console.log(email.value, password.value);
      await login(email.value, password.value);
      // If it makes it to this line then it was successful (no error!)
      if (!error.value) {
        console.log("User successfully logged in!");
        // Emit a custom event so that Welcome can listen for it and respond
        // by redirecting to Chatroom.
        // NOTE: Testing passing user up via emit() payload
        const currentCtxUser = auth.currentUser;
        console.log("LoginForm:handleSubmit:currentCtxUser: ", currentCtxUser); // Works!
        // console.log({ context });
        context.emit("login", currentCtxUser); // Works if pass directly
      }
    }

    return { email, password, handleSubmit, error };
  },
});
</script>

<style>
</style>

