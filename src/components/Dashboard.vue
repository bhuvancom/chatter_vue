<template>
  <div class="chat container">
    <div class="card">
      <div class="card-content">
        <h4>
          Hello Hi
          <b>{{this.currentUserName}}</b>
        </h4>
        <ul class="collection with-header">
          <li class="collection-header">
            <h4 class="center deep-purple-text">Users</h4>
          </li>
          <li class="collection-item" v-for="(usr,id) in users" :key="id">
            <div class="center">
              <span class="blue-text">{{usr.userName}}</span>
              <router-link
                :to="{name:'Chat',params:{toV:usr.userName,fromV:currentUserName}}"
                class="secondary-content"
              >
                <i class="material-icons">send</i>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Dashboard",
  props: ["currentUserName"],
  data() {
    return {
      users: [],
      currentUser: null
    };
  },
  methods: {
    sendMsg(user) {
      this.$router.push({
        name: "Chat",
        params: { toV: user, fromV: this.currentUser }
      });
    }
  },
  created() {
    let ref = db.collection("users");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          //let id = change.doc.id;
          //TODO:add last seen in db and show here
          //console.log(change);
          this.users.push({
            userName: change.doc.id,
            isCurrent: change.doc.id == this.currentUserName
          });
        }
      });
    });
  }
};
</script>
<style scoped>
/* .user {
  padding: 16px;
}
.users {
  max-height: 300px;
  overflow: auto;
} */
</style>