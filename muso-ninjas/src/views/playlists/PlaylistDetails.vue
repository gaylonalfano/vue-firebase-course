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
      <h3>No. of songs: {{ playlist.songs.length }}</h3>
      <p>Song list goes here...</p>
      <!-- <div v-for="song in playlist.songs" :key="song.name"></div> -->
      <h2>user.displayName: {{ user.displayName }}</h2>
      <div v-if="user.displayName === playlist.userName">
        <h2>user.diplayName === playlist.userName</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
// import { auth } from "@/firebase/config";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";

export default defineComponent({
  name: "PlaylistDetails",
  props: ["id"],
  setup(props) {
    // Bring in getDocument composable
    // Q: How can I pass the 'id' prop? First get useRoute()?
    // A: Pass props inside setup(props) then props.id
    // === Method using setup(props)
    const { document: playlist, error } = getDocument("playlists", props.id);
    console.log("playlist.value: ", playlist.value); // null initially
    // ======= SHAUN'S APPROACH using getUser(), computed(), etc.
    // Grab current user to check if playlist owner
    const { user } = getUser();
    // useDocument() composable to access deleteDoc()
    // FIXME Again, running into Vetur 2339 issues with playlist.value?.id
    // @ts-ignore
    const { deleteDoc } = useDocument("playlists", playlist.value?.id);

    // Create a computed() property to track owner since dependent on user data
    // NOTE Shaun called is 'ownership'
    const isOwner = computed<boolean | null>(() => {
      // Return true if three conditions are met:
      return (
        // FIXME Gotta figure out the TS/Vetur Error. Optional chaining doesn't work
        // @ts-ignore
        playlist.value && user.value && user.value.uid == playlist.value?.userId
      );
    });

    // TODO Add handleDeletePlaylist() handler logic
    // FIXME playlist.value.id Vetur error...
    async function handleDeletePlaylist() {
      // @ts-ignore
      if ((playlist.value?.id as string) && isOwner.value) {
        console.log(
          "PASSED:handleDeletePlaylist:playlist.value.id && isOwner.value"
        );
      }
    }

    // // ======= MY ATTEMPT using auth.currentUser
    // // Grab current user to check if playlist owner
    // const user = auth.currentUser;
    // // Q: Need a ref? I think maybe since we will eventually allow adding songs
    // // which will force a reload/remount of the component instance, right?
    // // However, it may not matter since we're only dealing with auth users. They log
    // // out, they reroute to /login.
    // let isOwner: boolean;
    // if (!error.value && user) {
    //   // NOTE: I can't check if(playlist.value) because it's originally null! Need to use error.value
    //   console.log(
    //     "PASSED:!error.value && user:playlist.value: ",
    //     playlist.value
    //   );
    //   console.log(
    //     "PASSED:!error.value && user:user.displayName: ",
    //     user?.displayName
    //   );

    //   // Check whether current auth user is playlist owner
    //   // TS2339: Property 'userName' does not exist on type 'UnwrappedObject<object>'.
    //   // Q: Do I perform the check here or in template?
    //   // A: If I do the check inside template, it works just fine...
    //   // if (user.displayName === playlist.value.username) {
    //   // }
    // }

    return { playlist, error, user, isOwner, handleDeletePlaylist };
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
