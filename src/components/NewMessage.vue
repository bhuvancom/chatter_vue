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
  props: ["fromV"],
  data() {
    return {
      newMessage: null,
      feedback: null
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage) {
        //console.log(this.toV,this.fromV);
        let msg = this.newMessage;
        this.newMessage = null;
        db.collection("messages")
          .add({
            from:this.fromV,
            content: msg,
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