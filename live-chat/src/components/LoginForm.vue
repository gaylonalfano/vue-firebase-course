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
import useLogin from "@/composables/useLogin";

export default defineComponent({
  name: "LoginForm",
  setup() {
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
      }
    }

    return { email, password, handleSubmit, error };
  },
});
</script>

<style>
</style>

