<template>
  <div class="home">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListView from "@/components/ListView.vue";
import getCollection from "@/composables/getCollection";

export default defineComponent({
  name: "Home",
  components: { ListView },
  setup() {
    // Composables
    const { documents: playlists, error } = getCollection("playlists");

    return { playlists, error };
  },
});
</script>
