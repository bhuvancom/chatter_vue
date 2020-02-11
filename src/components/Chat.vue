<template>
  <div class="chat container">
    <h2 class="center teal-text">Bhuvancom Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages collection with-header" v-chat-scroll>
          <li v-for="(msg,i) in messages" :key="i" class="row">
            <div class="card" v-bind:class="[msg.from==fromV?'right me':'left you']">
              <span
                class="name"
                v-bind:class="[msg.from==fromV?'me right':'teal-text left']"
              >{{msg.from}}</span>
              <br />
              <span
                class="grey-text msg text-darken-3"
                v-bind:class="[msg.from==fromV?'right':'left']"
              >{{msg.content}}</span>
              <br />
              <span class="grey-text time right">{{msg.timeStamp}}</span>
            </div>
            <br />
            <br />
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :fromV="fromV" />
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import NewMessage from "@/components/NewMessage";
import moment from "moment";
export default {
  name: "Chat",
  props: ["fromV"],
  components: {
    NewMessage
  },
  data() {
    return {
      messages: [],
      name: null
    };
  },
  created() {
    //console.log(this.toV,this.fromV);
    let ref = db.collection("messages").orderBy("timeStamp");
    // .where("from", "==", this.fromV)
    // .where("to", "==", this.toV);
    ref.onSnapshot(
      snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let doc = change.doc;
            //console.log(doc.data());
            this.messages.push({
              id: doc.id,
              from: doc.data().from,
              content: doc.data().content,
              timeStamp: moment(doc.data().timeStamp).format("lll")
            });
          }
        });
      },
      error => {
        console.log("thisis", error);
      }
    );
  },
  mounted() {}
};
</script>
<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat .name {
  font-size: 0.9em;
}
.chat .time {
  display: block;
  font-size: 0.8em;
  bottom: 1px;
  padding: 4px;
}
.messages {
  max-height: 300px;
  overflow: auto;
}

.messages::-webkit-scrollbar {
  width: 4px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
.me {
  color: #000;
  font-size: 0.9em;
  padding: 8px;
  background: rgb(223, 238, 141);
  text-align: left;
  margin-right: 8px;
  border-radius: 15% 0% 15% 15%;
}
.name {
  font-size: 5px;
  padding: 8px;
}
.msg {
  font-size: 1.2em;
  padding: 8px;
}
.you {
  background-color: rgb(236, 229, 229);
  border-radius: 0% 15% 15% 15%;
  padding: 8px;
  margin-left: 4px;
}
</style>