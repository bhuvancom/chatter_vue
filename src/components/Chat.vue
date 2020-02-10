<template>
  <div class="chat container">
    <h2 class="center teal-text">Bhuvancom Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages collection with-header" v-chat-scroll>
          <li class="collection-header">
            <h4 class="center deep-purple-text">Chat with {{toV}}</h4>
          </li>
            <li v-for="msg in messages" :key="msg.id" class="row">
              <div class="card" v-bind:class="[msg.name==name?'right me':'left you']">
                <span class="name" v-bind:class="[msg.name==name?'me right':'teal-text left']">{{msg.name}}</span><br>
                <span class="grey-text msg text-darken-3" v-bind:class="[msg.name==name?'right':'left']">{{msg.content}}</span><br>
                <span
                  class="grey-text time right"
                >{{msg.timeStamp}}</span>
              </div>
              <br />
              <br />
            </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
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
  props: ["toV","fromV"],
  components: {
    NewMessage
  },
  data() {
    return {
      messages: [],
      name:null,
    };
  },
  created() {
    let ref = db.collection("messages").orderBy("timeStamp");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timeStamp: moment(doc.data().timeStamp).format("lll")
          });
        }
      });
    });
  },
  mounted(){
    
  }

};
</script>
<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat .name {
  font-size: .9em;
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
  text-align:left;
  margin-right: 8px;
  border-radius: 15% 0% 15% 15%;
}
.name{
  font-size: 5px;
  padding: 8px;
}
.msg{
  font-size: 1.2em;
  padding: 8px;
}
.you{
  background-color: rgb(236, 229, 229);
  border-radius: 0% 15% 15% 15%;
  padding: 8px;
}
</style>