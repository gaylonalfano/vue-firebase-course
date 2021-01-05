<template>
  <nav v-if="user">
    <div>
      <p>Hey there, {{ user.displayName }}</p>
      <p class="email">Currently logged in as: {{ user.email }}</p>
    </div>
    <button @click="handleSignout">Logout</button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";

export default defineComponent({
  name: "Navbar",
  setup() {
    // Let's access getUser composable functionality
    const { user } = getUser();

    // Let's access our useLogout functionality
    const { error, logout } = useLogout();

    // Get a router to redirect to home page
    const router = useRouter();

    async function handleSignout() {
      await logout();
      if (!error.value) {
        console.log("Successfully logged out user.");
        // Redirect to Welcome page
        // NOTE This approach works as well!
        // Alternative is to watch(user) for changes and reroute inside Chatroom.
        // router.push({ name: "Welcome" });
      }
    }

    return { error, handleSignout, user };
  },
});
</script>

<style>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
</style>
