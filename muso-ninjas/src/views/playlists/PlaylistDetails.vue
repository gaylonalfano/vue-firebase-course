<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist information left side -->
    <div class="playlist-info">
      <div class="cover">
        <!-- use v-bind to the source -->
        <img :src="playlist.coverImageUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by: {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
    </div>

    <!-- song list on right side -->
    <div class="playlist-songs">
      <h3>No. of songs: {{ playlist.songs.length }}</h3>
      <p>Song list goes here...</p>
      <!-- <div v-for="song in playlist.songs" :key="song.name"></div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { useRoute } from "vue-router";
import getDocument from "@/composables/getDocument";

export default defineComponent({
  name: "PlaylistDetails",
  props: ["id"],
  setup(props) {
    // Let's get our route params using useRoute()
    // UPDATE: Not needed! Just pass props to setup(props)!
    // const route = useRoute();
    // console.log("route.params: ", route.params); // Works

    // Bring in getDocument composable
    // Q: How can I pass the 'id' prop? First get useRoute()?
    // A: Pass props inside setup(props) then props.id
    // === Method using setup(props)
    const { document: playlist, error } = getDocument("playlists", props.id);
    // === Method using useRoute()
    // const { document: playlist, error } = getDocument(
    //   "playlists",
    //   route.params.id as string
    // );
    // console.log("playlist.value: ", playlist.value); // null initially

    return { playlist, error };
  },
});
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>
