<template>
  <div class="chat container">
    <div class="card">
      <div class="card-content">
        <div class="main2">
          <ul class="collection">
            <h4 class="center deep-purple-text">
              hello
              <b v-if="this.currentUserName">{{this.currentUserName}}</b>
            </h4>
          </ul>
          <div v-if="this.main1" class="main1 center">
            <div class="preloader-wrapper active">
              <div class="spinner-layer spinner-red-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div>
                <div class="gap-patch">
                  <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </div>
          <Chat v-if="!this.main1 && this.active" :fromV="this.currentUserName" />
          <div v-if="!this.active && !this.main1">
            <div class="row">
              <div class>
                <div class="card blue-grey darken-3">
                  <div class="card-content white-text">
                    <span class="card-title">Account Not verified</span>
                    <p>
                      Hello {{this.currentUserName}}, your account is not verified, thus not active to chat.
                      Please check your {{this.email}}, and verify it.
                    </p>
                  </div>
                  <div class="card-action center">
                    <span class="red-text center" v-if="this.feedback">{{this.feedback}}</span>
                    <button
                      id="resend"
                      class="btn"
                      @click.prevent="resend"
                    >Resend Verification Email</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-if="!this.main1" class="main2">
            <ul class="collection with-header">
              <li class="collection-header">
                <h4 class="center deep-purple-text">Users</h4>
              </li>
              <li class="collection-item" v-for="(usr,id) in users" :key="id">
                <div class="">
                  <span class="blue-text">{{usr.userName}}</span>
                  <router-link
                    v-if="!usr.isCurrent"
                    :to="{name:'Chat',params:{fromV:currentUserName}}"
                    class="secondary-content"
                  >
                    <i class="material-icons">send</i>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
import Chat from "@/components/Chat";
export default {
  name: "Dashboard",
  props: ["uid"],
  components: {
    Chat
  },
  data() {
    return {
      users: [],
      currentUserName: null,
      main1: true,
      active: false,
      email: null,
      feedback: null
    };
  },
  methods: {
    resend() {
      //resend mail
      if (!this.active && this.uid) {
        const user = firebase.auth().currentUser;
        $("#resend").hide("fast", () => {
          user
            .sendEmailVerification()
            .then(() => {
              this.feedback = "Mail Sent, Please follow steps provided in mail";
            })
            .catch(err => {
              this.feedback = err;
            });
        });
      }
    }
  },
  created() {
    let user = firebase.auth().currentUser;
    this.active = user.emailVerified;
    this.email = user.email;

    let ref = db.collection("users");
    let uid = this.uid;
    ref
      .where("user_id", "==", uid)
      .get()
      .then(snap => {
        snap.forEach(ele => {
          this.currentUserName = ele.data().user_name;
          this.main1 = false;
        });
        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type == "added") {
              //let id = change.doc.id;
              //TODO:add last seen in db and show here
              //console.log(change);
              this.users.push({
                userName: change.doc.id,
                isCurrent: change.doc.id === this.currentUserName
              });
              //console.log(change.doc.id, this.currentUserName);
            }
          });
        });
      });
    // .then();
  },
  beforeMount() {}
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
.hide {
  display: none;
}
</style>