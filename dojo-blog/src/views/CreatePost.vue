<template>
  <div class="create-post">
    <form @submit.prevent="createPost">
      <label>Title:</label>
      <input v-model="title" type="text" name="title" required />
      <label>Content:</label>
      <textarea v-model="body" required></textarea>
      <label>Tags (hit Enter to add a tag)</label>
      <input
        v-model="tag"
        type="text"
        name="tags"
        @keydown.enter.prevent="addTagHandler"
      />
      <div class="pill" v-for="tag in tags" :key="tag">#{{ tag }}</div>
      <button>Add Post</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Post from "@/interfaces/post";
import { projectFirestore, timestamp } from "@/firebase/config";

export default defineComponent({
  name: "CreatePost",
  setup() {
    const title = ref<string>("");
    const body = ref<string>("");
    const tag = ref<string>("");
    const tags = ref<string[]>([]);
    // Q: Can I use extend Post type to add the 'id' field on top?
    // Q: Add the newPost object inside this funtion or setup()?
    // A: Should put inside createPost() function!

    const router = useRouter();
    // console.log(router);

    function addTagHandler(e: KeyboardEvent): void {
      // console.group("addTagHandler Executed");
      console.log(e.type);
      // Check that tag isn't already in tags
      // If not, add to tags array
      if (!tags.value.includes(tag.value)) {
        // Clean up any extra whitespaces
        tag.value = tag.value.replace(/\s/, "");
        tags.value.push(tag.value);
      }
      // Clear the input regardless
      tag.value = "";
      // console.log(tags.value); // works
    }

    // SEAN'S SOLUTION:
    // async function handleSubmit() {
    //   const post = {
    //     title: title.value,
    //     body: body.value,
    //     tags: tags.value,
    //   };

    //   // He just makes the fetch directly and doesn't return anything!
    //   await fetch("http://localhost:3000/posts", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(post),
    //   });
    // }

    // // MY ATTEMPT: Using json-server
    // async function createPost() {
    //   const newPost: Post = {
    //     // id: Math.floor(Math.random() * Math.floor(100)), // json-server generates id for us!
    //     title: title.value,
    //     body: body.value,
    //     tags: tags.value,
    //   };
    //   const url: RequestInfo = "http://localhost:3000/posts";
    //   const opts: RequestInit = {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newPost),
    //   };
    //   const response = await fetch(url, opts);
    //   // NOTE I don't think I need to do these extra steps and return result
    //   // unless I plan on doing something with it in the template, etc.
    //   // const result = await response.json();
    //   // return result;

    // MY ATTEMPT: Firestore
    async function createPost() {
      const post = {
        title: title.value,
        body: body.value,
        tags: tags.value,
        createdAt: timestamp(),
      };
      const response = await projectFirestore.collection("posts").add(post);
      console.log(response);
      // Let's reset the form fields
      // NOTE Not necessary after we added the redirect
      title.value = "";
      body.value = "";
      tags.value = [];

      // Redirect back to Home page
      router.push({ name: "Home" });
    }

    return { title, body, tag, tags, addTagHandler, createPost };
  },
});
</script>

<style>
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 2px solid #dfdfdf;
}
textarea {
  height: 160px;
}
label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}
label::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1.5deg);
}
button {
  display: block;
  margin-top: 30px;
  background: #ff8800;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
}
.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}
</style>
