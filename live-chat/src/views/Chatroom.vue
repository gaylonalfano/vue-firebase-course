<template>
  <div class="container">
    <Navbar />
    <div v-if="user">
      <h3>User: {{ user.displayName }}</h3>
    </div>
    <div v-else>
      <h3>No User!</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import getUser from "@/composables/getUser";

export default defineComponent({
  name: "Chatroom",
  components: { Navbar },
  setup() {
    // Let's get the user from getUser composable
    const { user } = getUser();

    const router = useRouter();

    // TODO Watch user for status changes and redirect to
    // welcome page if logged out
    // Q: How to watch? Use watch() or computed()?
    // A: Shaun used watch(user) but I think computed() works too...
    // === MY ATTEMPT w/ computed()
    // const userStatus = computed(() => {
    //   console.log("userStatus computed triggered!");
    //   if (!user.value) {
    //     // No user found or they logged out. Time to reroute to welcome
    //     console.log("user.value not found. Re-routing to Welcome"); // Works on logout!
    //     router.push({ name: "Welcome" });
    //   }
    // });
    // === SHAUN'S w/ watch()
    // NOTE Seems to be more explicit...
    watch(user, () => {
      console.log("user value changed. watch function triggered!");
      if (!user.value) {
        // No user found or they logged out. Time to reroute to welcome
        console.log("user.value not found. Re-routing to Welcome"); // Works on logout!
        router.push({ name: "Welcome" });
      }
    });

    return { user };
  },
});
</script>

<style>
</style>
