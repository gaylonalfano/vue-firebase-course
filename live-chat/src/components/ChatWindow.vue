<template>
  <div class="chat-window">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="formattedMessages" class="messages">
      <div
        v-for="message in formattedMessages"
        :key="message.id"
        class="single-message"
      >
        <span class="created-at">{{ message.createdAt }}</span>
        <span class="name">{{ message.name }}</span>
        <span class="message">{{ message.message }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { formatDistanceToNow } from "date-fns";
import getCollection from "@/composables/getCollection";
import {
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from "@firebase/firestore-types";

export default defineComponent({
  name: "ChatWindow",
  setup() {
    // Let's use composable to get messages collection
    // Q: Do I need to await or something? Otherwise documents.value is null initially
    // Can rename variables while destructuring! Neat!
    const { error, documents: messages } = getCollection("messages");
    console.log("ChatWindow:messages.value: ", messages.value); // null

    // Create a new computed property. We used computed() to do this
    // because it's based on something that ALREADY exists!
    // In this case, we're going to compute formattedMessages array
    // That updates/formats the createdAt property.
    const formattedMessages = computed(() => {
      // Check that we actually have documents
      if (messages.value) {
        return messages.value.map((message) => {
          // ERROR: I get TS error if I don't use message.data()
          // It compiles if I use TS IGNORE but not ideal
          // @ts-ignore
          let time = formatDistanceToNow(message.createdAt.toDate());
          // Return a new object with updated createdAt value
          return { ...message, createdAt: time };
        });
      }
    });

    return { error, messages, formattedMessages };
  },
});
</script>

<style>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single-message {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>
