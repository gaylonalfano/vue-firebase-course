<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" alt="Ninja wearing headphones" />
      <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <div v-if="user">
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'Signup' }" class="btn">Signup</router-link>
          <router-link :to="{ name: 'Login' }" class="btn">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";

export default defineComponent({
  name: "Navbar",
  setup() {
    // Use composables
    const { error, logout } = useLogout();
    const { user } = getUser();

    const router = useRouter();

    // Handle the logout and
    async function handleLogout() {
      await logout();
      // redirect to /login page
      if (!error.value) {
        console.log("SUCCESS:handleLogout");
        router.push({ name: "Login" });
      }
    }

    return { error, handleLogout, user };
  },
});
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
</style>
