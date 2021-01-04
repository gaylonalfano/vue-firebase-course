<template>
  <form>
    <textarea
      placeholder="Type a message and hit Enter to send."
      v-model="message"
      @keypress.enter.prevent="submitChatRecord"
    >
    </textarea>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { timestamp } from "@/firebase/config";
import getUser from "@/composables/getUser";

export default defineComponent({
  name: "NewChatForm",
  setup() {
    // Use our getUser composable to get the user info
    const { user } = getUser();

    // Create a 'message' ref to bind with template v-model data property
    const message = ref<string>("");

    // Create a submit handler that stores the chat info into a chat object
    // NOTE We're going to save this chat data in Firestore eventually
    async function submitChatRecord() {
      const chatRecord = {
        name: user?.value?.displayName,
        message: message.value,
        createdAt: timestamp(),
      };

      // TODO Eventually send chatRecord to FB database to get stored
      console.log(chatRecord);

      // Reset/clear the textarea after submit
      message.value = "";
    }

    return { message, submitChatRecord };
  },
});
</script>

<style>
form {
  margin: 10px;
}
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
</style>
