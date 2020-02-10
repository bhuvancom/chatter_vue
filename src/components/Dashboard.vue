<template>
  <div class="chat container">
    <div class="card">
      <div class="card-content">
        <ul class="collection with-header">
          <li class="collection-header">
            <h4 class="center deep-purple-text">Users</h4>
          </li>
          <li class="collection-item" v-for="(usr,id) in users" :key="id">
            <div class="center">
              <span class="blue-text">{{usr.userName}}</span>
              <a  href="" @click.prevent="sendMsg(usr.userName)" class="secondary-content">
                <i class="material-icons">send</i>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
export default {
  name: "Dashboard",
  data() {
    return {
      users: []
    };
  },
  methods: {
    sendMsg(user){
      this.$router.push({name:'Chat',props:{name:user}})
      
    }
  },
  created() {
    let ref = db.collection("users");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          //let id = change.doc.id;
          //TODO:add last seen in db and show here
          // ref.where().doc(id).get().then(doc=>{
          //   if(doc.exists){

          //   }
          // })
          //console.log(change);
          this.users.push({
            userName: change.doc.id
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