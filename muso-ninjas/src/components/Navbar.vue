<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" alt="Ninja wearing headphones" />
      <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <button>Logout</button>
        <router-link :to="{ name: 'Signup' }" class="btn">Signup</router-link>
        <router-link :to="{ name: 'Login' }" class="btn">Login</router-link>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
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
