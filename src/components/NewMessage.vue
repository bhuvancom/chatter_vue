<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-msg" class="left">New Message (enter to send):</label>
      <input type="text" name="new-msg" id="new-msg" v-model="newMessage" />
      <p class="red-text" v-if="feedback">{{feedback}}</p>
    </form>
  </div>
</template>
<script>
import db from "@/firebase/init";
export default {
  name: "NewMessage",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      feedback: null
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage) {
        db.collection("messages")
          .add({
            content: this.newMessage,
            name: this.name,
            timeStamp: Date.now()
          })
          .then(() => {
            this.newMessage = null;
            this.feedback = null;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "Empty message";
      }
    }
  }
};
</script>