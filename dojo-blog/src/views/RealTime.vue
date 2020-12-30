<template>
  <h1>Real-Time</h1>
  <div v-for="post in posts" :key="post.id">
    <div>{{ post.title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { projectFirestore } from "@/firebase/config";

export default defineComponent({
  name: "RealTime",
  setup() {
    // Ref for our posts we get from db
    const posts = ref<Record<string, any>[]>([]);

    // Get a reference to posts Collection by establishing a real-time listener
    // using .onSnapshot((snapshot) => {...}) that listens for QuerySnapshot events.
    // NOTE The onNext callback returns snapshot object that contains all the docs, etc.
    projectFirestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        // Use this snapshot object to update my posts.value Ref
        // by looping through its docs, etc.
        // NOTE Firebase returns snapshot when connection is first established
        // console.log(snapshot);
        posts.value = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        // console.log(posts.value);
      });
    // Let's return our posts Ref so we can use inside template
    return { posts };
  },
});
</script>

<style>
</style>
