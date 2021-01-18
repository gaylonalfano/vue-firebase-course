<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleAddSong">
      <h4>Add new song</h4>
      <input type="text" placeholder="Song Title" v-model="title" required />
      <input type="text" placeholder="Artist" v-model="artist" required />
      <button v-if="!isPending">Add Song</button>
      <button v-else disabled>Saving...</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useDocument from "@/composables/useDocument";
import Playlist from "@/interfaces/playlist";

export default defineComponent({
  name: "AddSong",
  props: ["playlist"],
  setup(props) {
    // Bring in useDocument composable and its updateDoc() method
    // Q: How to type cast props.playlist as Playlist?
    const { updateDoc, isPending, error } = useDocument(
      "playlists",
      (props.playlist as Playlist).id as string
    );

    // Q: Where does the auth user and playlist come from? Parent via props?
    // A: Yes, we pass 'playlist' as prop from PlaylistDetails
    // Create input data properties refs
    const title = ref<string>("");
    const artist = ref<string>("");
    // Create a showForm ref to use in our Add Songs button
    const showForm = ref<boolean>(false);

    // Create our form submit handler
    async function handleAddSong() {
      // Confirm we have user inputs for new song
      if (title.value && artist.value) {
        console.log("PASSED:AddSong:handleAddSong:title.value && artist.value");
        // Gather up our song details into an object
        // Q: Does newSong need to be reactive? Don't think so...
        type Song = {
          title: string;
          artist: string;
          id: number;
        };
        const newSong: Song = {
          title: title.value,
          artist: artist.value,
          id: Math.floor(Math.random() * 1000000),
        };
        // console.log("handleAddSong:newSong: ", newSong); // undefined

        // Use our updateDoc(updatesObj) to update/add newSong
        // NOTE Don't need to do some try/catch as that's already
        // built into addDoc()!
        await updateDoc({
          // Q: How to access current/existing songs list?
          // A: Use our props! Then just spread!
          songs: [...(props.playlist.songs as Song[]), newSong],
        });

        // Clear the form inputs
        title.value = "";
        artist.value = "";
      }
    }

    return { title, artist, showForm, handleAddSong, isPending };
  },
});
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
