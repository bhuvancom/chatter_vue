<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{name:'Dashboard'}" class="brand-logo left">Chatter</router-link>
        <ul class="right">
          <li>
            <router-link :to="{name:'Dashboard'}">Home</router-link>
          </li>
          <li v-if="user">
            <a @click="profile">{{this.name}}</a>
          </li>
          <li v-if="user">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      id: null,
      name: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Welcome" });
        });
    },
    profile() {
      this.$router
        .push({
          name: "Profile",
          params: { uid: firebase.auth().currentUser.uid }
        })
        .catch(err => {});
    }
  },
  created() {
    //let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        let ref = db.collection("users");
        // get current user
        // Create a query against the collection.
        ref
          .where("user_id", "==", firebase.auth().currentUser.uid)
          .get()
          .then(snapshot => {
            snapshot.forEach(element => {
              this.name = element.data().user_name;
            });
          });
      } else {
        this.user = null;
      }
    });
  }
};
</script>