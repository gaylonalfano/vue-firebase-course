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
    <button>Sign up</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SignupForm",
  setup() {
    // Create Refs for our input data properties
    const displayName = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");

    // Create Signup form submit handler
    function handleSubmit() {
      console.log(displayName.value, email.value, password.value);
    }

    return { displayName, email, password, handleSubmit };
  },
});
</script>

<style>
</style>
