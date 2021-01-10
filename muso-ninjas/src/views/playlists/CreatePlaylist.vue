<template>
  <form @submit.prevent="handleCreatePlaylist">
    <h4>Create New Playlist</h4>
    <input type="text" placeholder="Playlist Title" v-model="title" required />
    <textarea
      placeholder="Description"
      v-model="description"
      required
    ></textarea>
    <!-- upload playlist image -->
    <label>Upload playlist cover image</label>
    <input type="file" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Create</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useCollection from "@/composables/useCollection";

export default defineComponent({
  name: "CreatePlaylist",
  setup() {
    // Composable to interact/add doc to collection
    const { error, addDoc, isPending } = useCollection("playlists");

    // Data properties Refs
    const title = ref<string>("");
    const description = ref<string>("");

    // Handle form submission to add document (playlist)
    // NOTE addDoc is async so need to make this async as well so we can await
    async function handleCreatePlaylist() {
      // Package up user inputs into a playlist object
      const playlist = { title: title.value, description: description.value };

      // Use addDoc(playlist) to try to create the document
      // NOTE addDoc is async so need to await
      await addDoc(playlist);

      if (!error.value) {
        console.log("SUCCESS:handleCreatePlaylist:playlist: ", playlist);
      } // Else, display error inside template
    }

    return {
      title,
      description,
      error,
      addDoc,
      isPending,
      handleCreatePlaylist,
    };
  },
});
</script>

<style>
form {
  background: white;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
