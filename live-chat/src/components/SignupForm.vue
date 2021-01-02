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
import useSignup from "@/composables/useSignup";

export default defineComponent({
  name: "SignupForm",
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
        context.emit("signup");
      }
    }

    return { displayName, email, password, handleSubmit, error };
  },
});
</script>

<style>
</style>
