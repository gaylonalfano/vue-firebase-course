<template>
  <div class="welcome container">
    <p>Welcome</p>
    <div v-if="showLogin">
      <h2>Log in</h2>
      <LoginForm @login="enterChatroom" />
      <p>
        No account yet? <span @click="showLogin = false">Sign up</span> instead.
      </p>
    </div>
    <div v-else>
      <h2>Sign up</h2>
      <SignupForm @signup="enterChatroom" />
      <p>
        Already registered?
        <span @click="showLogin = true">Log in</span> instead.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import SignupForm from "@/components/SignupForm.vue";
import LoginForm from "@/components/LoginForm.vue";

export default defineComponent({
  name: "Welcome",
  components: { SignupForm, LoginForm },
  setup(props, context) {
    // Get router so we can redirect to Chatroom after login
    const router = useRouter();
    // Create a Ref for showLogin data property
    // NOTE Shaun used showLogin instead. Easier to follow than isSignedUp
    const showLogin = ref<boolean>(true);

    // Create 'login' event handler to redirect to /chatroom
    function enterChatroom() {
      console.log("enterChatroom fired for @login or @signup event");
      router.push({ name: "Chatroom" });
      // Q: How to get the user details passed as well? Use context?
      // A: Don't believe so. We use Firebase methods to get the User, etc.
      console.log(context.attrs);
      console.log(context.slots);
    }

    return { showLogin, enterChatroom };
  },
});
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}
/* form styles */
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline-color: #5ae4ca;
  color: #999;
  margin: 10px auto;
}
.welcome span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.welcome button {
  margin: 20px auto;
}
</style>
