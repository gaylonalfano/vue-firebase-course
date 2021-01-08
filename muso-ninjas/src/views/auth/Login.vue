<template>
  <form @submit.prevent="handleLogin">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-else disabled>Loading...</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useLogin from "@/composables/useLogin";

export default defineComponent({
  name: "Login",
  setup() {
    // Use the composable functionality
    const { error, login, isPending } = useLogin();

    // Create my bound data props
    const email = ref<string>("");
    const password = ref<string>("");

    async function handleLogin() {
      // Try to login with the user inputs
      const response = await login(email.value, password.value);

      if (!error.value) {
        console.log("SUCCESS:Login:handleLogin:response", response?.user);
      }
    }

    return { email, password, error, isPending, handleLogin };
  },
});
</script>

<style>
</style>
