<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a new Playlist</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FieldPath, WhereFilterOp } from "@firebase/firestore-types";
import ListView from "@/components/ListView.vue";
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";

export default defineComponent({
  name: "UserPlaylist",
  components: { ListView },
  setup() {
    // Get current auth user
    const { user } = getUser();
    // Extract documents and error from getCollection composable
    const { documents: playlists, error } = getCollection("playlists", [
      "userId",
      "==",
      user.value?.uid,
    ]);

    // console.log("UserPlaylists:playlists: ", playlists.value); // null
    // console.log(playlists); // RefImpl {}

    return { playlists, error };
  },
});
</script>

<style>
</style>
