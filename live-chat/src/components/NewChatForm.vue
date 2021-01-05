<template>
  <form>
    <textarea
      placeholder="Type a message and hit Enter to send."
      v-model="message"
      @keypress.enter.prevent="submitChatRecord"
    >
    </textarea>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { timestamp } from "@/firebase/config";
import getUser from "@/composables/getUser";
import useCollection from "@/composables/useCollection";

export default defineComponent({
  name: "NewChatForm",
  setup() {
    // Use our getUser composable to get the user info
    const { user } = getUser();

    // Use our useCollection composable to add doc to messages
    const { error, addDoc } = useCollection("messages");

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
      console.log("submitChatRecord:chatRecord: ", chatRecord);
      // NOTE addDoc will connect to collection arg passed to useCollection("messages")
      await addDoc(chatRecord); // Works! Created 'messages' collection too!

      // Reset/clear the textarea if no error i.e., error.value = null
      if (!error.value) {
        message.value = "";
      }
    }

    return { message, submitChatRecord, error };
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
