<template>
  <form @submit.prevent="handleSignup">
    <h3>Signup</h3>
    <input
      type="text"
      placeholder="Display name"
      v-model="displayName"
      required
    />
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useSignup from "@/composables/useSignup";

export default defineComponent({
  name: "Signup",
  setup() {
    // Access composables functionality
    const { error, signup, isPending } = useSignup();

    // Create our data properties Refs
    const displayName = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");

    // Handle form submission by using signup composable
    async function handleSignup() {
      const response = await signup(
        email.value,
        password.value,
        displayName.value
      );

      if (!error.value) {
        console.log(
          "SUCCESS:Signup:handleSignup:response.user: ",
          response?.user
        );
      } // Else we display error in template
    }

    return { displayName, email, password, error, handleSignup, isPending };
  },
});
</script>

<style>
</style>
