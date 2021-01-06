<template>
  <div class="chat-window">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="messages" class="messages">
      <div v-for="message in messages" :key="message.id" class="single-message">
        <span class="created-at">{{ message.createdAt.toDate() }}</span>
        <span class="name">{{ message.name }}</span>
        <span class="message">{{ message.message }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import getCollection from "@/composables/getCollection";

export default defineComponent({
  name: "ChatWindow",
  setup() {
    // Let's use composable to get messages collection
    // Q: Do I need to await or something? Otherwise documents.value is null initially
    // Can rename variables while destructuring! Neat!
    const { error, documents: messages } = getCollection("messages");
    console.log("ChatWindow:messages.value: ", messages.value); // null

    return { error, messages };
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
