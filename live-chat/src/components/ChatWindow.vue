<template>
  <div class="chat-window">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="messages" class="messages" ref="messagesDivRef">
      <div v-for="message in messages" :key="message.id" class="single-message">
        <span class="created-at">{{
          formatDistanceToNow(message.createdAt.toDate())
        }}</span>
        <span class="name">{{ message.name }}</span>
        <span class="message">{{ message.message }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onUpdated } from "vue";
import { formatDistanceToNow } from "date-fns";
import getCollection from "@/composables/getCollection";

export default defineComponent({
  name: "ChatWindow",
  setup() {
    // Let's use composable to get messages collection
    // Q: Do I need to await or something? Otherwise documents.value is null initially
    // Can rename variables while destructuring! Neat!
    const { error, documents: messages } = getCollection("messages");
    // console.log("ChatWindow:messages.value: ", messages.value); // null

    // Create a Template Ref for our div.messages element
    // NOTE This Ref is initially null
    const messagesDivRef = ref<HTMLDivElement | null>(null);
    // console.log(messagesDivRef, messagesDivRef.value); // RefImpl, null

    // Use onUpdated() to grab messagesDivRef element and make it auto-scroll down
    onUpdated(() => {
      console.log("onUpdated Triggered!");
      // console.log(messagesDivRef, messagesDivRef.value); // RefImpl, <div class="messages">

      // Let's access our messages HTMLDivElement and make it auto-scroll to bottom
      messagesDivRef.value!.scrollTop = messagesDivRef.value!.scrollHeight; // WORKS!
    });
    // NOTE I don't need this logic check!
    // if (messagesDivRef.value) {
    // // === Using Element.scrollTop = Element.scrollHeight (older approach)
    // messagesDivRef.value.scrollTop = messagesDivRef.value?.scrollHeight; // WORKS!
    // === Using Element.scrollIntoView() seems like a modern solution
    // messagesDivRef.value.scrollIntoView({
    //   behavior: "smooth",
    //   block: "end",
    //   inline: "nearest",
    // }); // NOPE!
    // messagesDivRef.value.scrollIntoView(false); // NOPE!
    // }
    // });
    // ==== Format Date Method 1: Use computed() to create new array with new time
    // Create a new computed property. We used computed() to do this
    // because it's based on something that ALREADY exists!
    // In this case, we're going to compute formattedMessages array
    // That updates/formats the createdAt property.
    // const formattedMessages = computed(() => {
    //   // Check that we actually have documents
    //   if (messages.value) {
    //     return messages.value.map((message) => {
    //       // ERROR: I get TS error if I don't use message.data()
    //       // It compiles if I use TS IGNORE but not ideal
    //       // @ts-ignore
    //       let time = formatDistanceToNow(message.createdAt.toDate());
    //       // Return a new object with updated createdAt value
    //       return { ...message, createdAt: time };
    //     });
    //   }
    // });

    // ==== Format Date Method 2: Use the formatDistanceToNow() directly in template
    // Q: Can I just do this conversion directly inside the template?
    // A: Yes! Can call it using {{ formatDistanceToNow(message.createdAt.toDate()) }}

    return { error, messages, formatDistanceToNow, messagesDivRef };
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
