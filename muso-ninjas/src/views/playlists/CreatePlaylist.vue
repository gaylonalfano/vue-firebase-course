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
    <input type="file" @change="handleFileChange" />
    <!-- <div v-if="error" class="error">{{ error }}</div> -->
    <div v-if="fileError" class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useCollection from "@/composables/useCollection";
import useStorage from "@/composables/useStorage";

export default defineComponent({
  name: "CreatePlaylist",
  setup() {
    // Composable to interact/add doc to collection
    const { error, addDoc, isPending } = useCollection("playlists");
    // Q: Rename 'error' to something unique to avoid clashing with other error vars?
    const { filePath, fileUrl, uploadImage } = useStorage();

    // Data properties Refs
    const title = ref<string>("");
    const description = ref<string>("");
    // Handle file upload changes. Use 'File' TS type
    const coverImageFile = ref<File | null>(null);
    const fileError = ref<string | null>(null);

    // Handle form submission to add document (playlist)
    // NOTE addDoc is async so need to make this async as well so we can await
    async function handleCreatePlaylist() {
      // Check that a file (and it's valid) has been uploaded
      if (coverImageFile.value) {
        // console.log(title.value, description.value, coverImageFile.value);
        // Package up user inputs into a playlist object
        const playlist = { title: title.value, description: description.value };

        // Use addDoc(playlist) to try to create the document
        // NOTE addDoc is async so need to await
        await addDoc(playlist);

        if (!error.value) {
          console.log("SUCCESS:handleCreatePlaylist:playlist: ");
          // NOTE No need to reset error.value since already null
        } // Else, display error inside template

        // Upload the file to our storage
        await uploadImage(coverImageFile.value);
        // const response = await uploadImage(coverImageFile.value);
        // console.log(response); // undefined
        // Check if we have a fileUrl.value (means it worked I think)
        console.log("fileUrl.value: ", fileUrl.value);
      } else {
        // Inform user that a valid file must be uploaded
        fileError.value = "Please select an image file (png or jpeg)";
      }
    }

    // Allowed file types
    const types: string[] = ["image/png", "image/jpeg"];

    function handleFileChange(e: Event) {
      // Q: Create Template Ref inside this function?
      // A: NO. Outside like most other refs.
      // Need to watch/track this input field's value and update when changed
      console.log("handleFileChange:event.target:", e.target); // <input type="file">
      // console.log(e.target); // <input type="file">
      const inputFiles: FileList | null = (e.target as HTMLInputElement).files; // Works
      // const inputFile: File = inputFiles[0]; // Error possibly null
      console.log("BEFOREConditionals::inputFiles: ", inputFiles); // FileList
      console.log(
        "BEFOREConditionals::inputFiles?length: ",
        inputFiles?.length
      ); // 1, 0

      // === Method 1: Nested if statements. WORKS but ugly.
      // Need to handle if no file is uploaded at all.
      // if (inputFiles && inputFiles.length) {
      //   console.log("PASSED:inputFiles && inputFiles.length");
      //   // We have a file to work with. Update coverImageFile Ref value
      //   const inputFile: File = inputFiles[0]; // .name, .size, .type
      //   // Check that file types is compatible before blindly saving to our Ref
      //   if (inputFile && types.includes(inputFile.type)) {
      //     console.log("PASSED:inputFile && types.includes(inputFile.type)");
      //     // Finally feel good to update ref value with inputFile
      //     coverImageFile.value = inputFile;
      //     console.log(
      //       "UPDATED:handleFileChange:coverImageFile.value: ",
      //       coverImageFile.value
      //     );
      //     // Reset any possible fileError ref back to null
      //     fileError.value = null;
      //   } else {
      //     // Reset Ref value to null just in case
      //     coverImageFile.value = null;
      //     // Update fileError ref
      //     fileError.value = "Please select an image file (png or jpeg)";
      //   }
      // } else {
      //   // Reset Ref value to null just in case
      //   coverImageFile.value = null;
      //   // Update fileError ref
      //   fileError.value = "Please select an image file (png or jpeg)";
      // }

      // === Method 2: Multiple && conditions. WORKS and more DRY.
      // TODO Refactor. Had to break it up due to TS errors w/ possible 'null' values
      // Check that we have a file or not and update Ref
      if (
        inputFiles?.length &&
        inputFiles[0] &&
        types.includes(inputFiles[0].type)
      ) {
        console.log("PASSED:inputFiles && inputFiles.length");
        console.log("PASSED:types.includes(inputFiles[0].type)");
        // We have a file to work with. Update coverImageFile Ref value
        const inputFile: File = inputFiles[0]; // .name, .size, .type
        // Check that file types is compatible before blindly saving to our Ref
        // if (types.includes(inputFile.type)) {
        // Finally feel good to update ref value with inputFile
        coverImageFile.value = inputFile;
        console.log(
          "UPDATED:handleFileChange:coverImageFile.value: ",
          coverImageFile.value
        );
        // Reset any possible fileError ref back to null
        fileError.value = null;
      } else {
        // Reset Ref value to null just in case
        coverImageFile.value = null;
        // Update fileError ref
        fileError.value = "Please select an image file (png or jpeg)";
      }

      // === INITIAL TESTING ======
      // console.log(coverImage.value); // null
      // const coverImageFileComputed = computed(() => coverImage.value);
      // console.log("coverImageFileComputed: ", coverImageFileComputed); // ComputedRefImpl value: null

      // Q: Do I use a Template Ref to access the <input>?
      // A: NO! We use a Ref, but not a Template Ref. We get the
      // HTMLInputElement via event.target
      // Q: How to access 'this' or 'event.target' without a Ref?
      // A: Pass the 'event' arg to the handleFileChange(event)!
      // Update ref value on change
      // coverImage.value = coverImage.value?.value; // ERROR
      // Q: How to ensure coverImage.value has a value?
      // A: onUpdated() but we're not reloading the component
      // A: We just need to check for e.target.files[0]

      // === BROKEN: Tried Template Refs ===
      // Get the uploaded file properties using .files[0].name
      // if (coverImageFile.value) {
      //   console.log(coverImageFile.value); // ?
      // }
      // console.log(coverImageFile.value?.files); // undefined
      // console.log(coverImageFile.value); // null
    }

    return {
      title,
      description,
      error,
      fileError,
      addDoc,
      isPending,
      handleCreatePlaylist,
      handleFileChange,
    };
  },
});
</script>

<style>
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