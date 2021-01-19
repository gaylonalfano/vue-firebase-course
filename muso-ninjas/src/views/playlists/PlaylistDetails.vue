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
      <button v-if="isOwner" @click="handleDeletePlaylist">
        Delete Playlist
      </button>
    </div>

    <!-- song list on right side -->
    <div class="playlist-songs">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet.
      </div>
      <div class="single-song" v-for="song in playlist.songs" :key="song.id">
        <div class="song-details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="isOwner" @click="handleDeleteSong(song.id)">
          Delete
        </button>
      </div>

      <AddSong v-if="isOwner" :playlist="playlist" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, Ref } from "vue";
import { useRouter } from "vue-router";
import AddSong from "@/components/AddSong.vue";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import Playlist from "@/interfaces/playlist";
import Song from "@/interfaces/song";

export default defineComponent({
  name: "PlaylistDetails",
  components: { AddSong },
  props: ["id"],
  setup(props) {
    // Bring in getDocument composable
    // Q: How can I pass the 'id' prop? First get useRoute()?
    // A: Pass props inside setup(props) then props.id
    // UPDATE Add Playlist Type using Type Assertions. Otherwise playist
    // is a Ref<UnwrappedObject<object> | null> Type.
    const { document: playlist, error } = getDocument(
      "playlists",
      props.id
    ) as { document: Ref<Playlist | null>; error: Ref<string | null> };
    // console.log("playlist.value: ", playlist.value); // null initially
    // ======= SHAUN'S APPROACH using getUser(), computed(), etc.
    // Grab current user to check if playlist owner
    const { user } = getUser();
    // useDocument() composable to access deleteDoc()
    // FIXME Again, running into Vetur 2339 issues with playlist.value?.id
    // UPDATE Works with Playlist type! Use props.id for docId argument
    const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
    // Bring in deleteImage from useStorage composable
    const { deleteImage } = useStorage();
    // Bring in router so we can reroute to Home after deleting playlist
    const router = useRouter();

    // Create a computed() property to track owner since dependent on user data
    // NOTE Shaun called is 'ownership'
    const isOwner = computed(() => {
      // Return true if three conditions are met:
      return (
        // FIXME Gotta figure out the TS/Vetur Error. Optional chaining doesn't work
        // UPDATE Works if I cast playlist.value as Playlist!
        (playlist.value as Playlist) &&
        user.value &&
        user.value.uid == (playlist.value as Playlist)?.userId
      );
    });

    // TODO Add handleDeletePlaylist() handler logic
    // FIXME playlist.value.id Vetur error...
    // NOTE Don't need to perform checks on whether the playlist exists
    // or if the current user isOwner as we've already done that above.
    async function handleDeletePlaylist() {
      // NOTE Let's delete the Image first so we still have access to coverImagePath
      await deleteImage((playlist.value as Playlist)?.coverImagePath);
      await deleteDoc();

      // Reroute user to home page
      router.push({ name: "Home" });
    }

    async function handleDeleteSong(songId: number) {
      // Use the updateDoc(updatesObj) composable function
      // Get existing list of playlist.songs and filter out songId
      // NOTE Need to use Type Assertion 'as Song[]' otherwise Vetur Error
      const updatedSongs = playlist.value?.songs.filter(
        (song) => song.id != songId
      ) as Song[];

      // console.log(songId);
      // console.log("playlist.value.songs: ", playlist.value?.songs);
      // console.log("updatedSongs", updatedSongs);

      // Have the new filtered Array. Time to update playlist in FS
      await updateDoc({ songs: updatedSongs });
    }

    return {
      playlist,
      error,
      user,
      isOwner,
      handleDeletePlaylist,
      handleDeleteSong,
    };
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
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
