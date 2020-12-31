<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <button>Log in</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginForm",
  setup() {
    // Create Refs for our input data properties
    const email = ref<string>("");
    const password = ref<string>("");

    // Create Signup form submit handler
    function handleSubmit() {
      console.log(email.value, password.value);
    }

    return { email, password, handleSubmit };
  },
});
</script>

<style>
</style>

