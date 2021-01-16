<template>
  <div class="home">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref } from "vue";
import ListView from "@/components/ListView.vue";
import getCollection from "@/composables/getCollection";
import Playlist from "@/interfaces/playlist";

export default defineComponent({
  name: "Home",
  components: { ListView },
  setup() {
    // Composables
    // Q: How to add Playlist type to playists?
    // A: Add Type assertions on right-hand side
    const { documents: playlists, error } = getCollection("playlists") as {
      documents: Ref<Playlist[] | null>;
      error: Ref<string | null>;
    };

    return { playlists, error };
  },
});
</script>
