<template>
  <div class="create-post">
    <form>
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
      <button @click="createPost">Add Post</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import Post from "@/interfaces/post";
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

    function addTagHandler(e: KeyboardEvent): void {
      // console.group("addTagHandler Executed");
      // console.log(e.type);
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

    async function createPost() {
      const newPost = {
        id: Math.floor(Math.random() * Math.floor(100)),
        title: title.value,
        body: body.value,
        tags: tags.value,
      };
      const url: RequestInfo = "http://localhost:3000/posts";
      const opts: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(newPost),
      };
      const response = await fetch(url, opts);
      const result = await response.json();

      return result;
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
  border: 1px solid #eee;
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
