<template>
  <div class="container">
    <div class="card large blue">
      <div class="card-content">
        <p class="center">In order to use Chatter You must authenticate your self</p>
      </div>
      <div class="card-tabs">
        <ul class="tabs tabs-fixed-width">
          <li class="tab">
            <a href="#login" @click="opnLogin">Login</a>
          </li>
          <li class="tab">
            <a class="active" href="#signup" @click="opnSignup">Signup</a>
          </li>
        </ul>
      </div>
      <div class="card-content grey lighten-4">
        <div id="login">
          <form @submit.prevent="login">
            <h3 class="center deep-purple-text">Login</h3>
            <div class="field">
              <label for="email">Email:</label>
              <input type="email" name="lEmail" v-model="lEmail" />
            </div>
            <div class="field">
              <label for="password">Password:</label>
              <input type="password" name="lPwd" v-model="lPwd" />
            </div>
            <div class="center">
              <!-- Modal Trigger -->
              <a
                id="opn"
                @click="forget"
                href="#model1"
                data-target="modal1"
                class="red-text modal-trigger"
              >Forget Password</a>

              <!-- Modal Structure -->
              <div id="modal1" class="modal">
                <div class="modal-content">
                  <h4>Reset Password</h4>
                  <p>A bunch of text</p>
                </div>
                <div class="modal-footer">
                  <a
                    @click.prevent="forget"
                    href="#!"
                    class="modal-close waves-effect waves-green btn-flat"
                  >Send</a>
                </div>
              </div>
            </div>
            <p v-if="this.feedback" class="center red-text">{{this.feedback}}</p>
            <div class="progress hide">
              <div class="indeterminate blue"></div>
            </div>
            <div class="field center">
              <button class="btn deep-purple btn-large">Login</button>
            </div>
          </form>
        </div>
        <div id="signup" class="hide">
          <form @submit.prevent="signUp">
            <h3 class="center deep-purple-text">Signup</h3>
            <div class="field">
              <label for="email">Email:</label>
              <input type="email" name="email" v-model="email" />
            </div>
            <div class="field">
              <label for="password">Password:</label>
              <input type="password" name="password" v-model="password" />
            </div>
            <div class="field">
              <label for="uName">Name:</label>
              <input type="text" name="uName" v-model="uName" />
            </div>

            <div class="field">
              <label for="alias">User Name:</label>
              <input type="text" name="user_name" v-model="user_name" />
            </div>
            <p v-if="this.feedbackS" class="center red-text">{{this.feedbackS}}</p>
            <div class="progress hide">
              <div class="indeterminate blue"></div>
            </div>
            <div class="field center">
              <button class="btn deep-purple btn-large">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import db from "@/firebase/init";
import slugify from "slugify";
$(document).ready(function() {
  $(".modal").modal();
});
export default {
  name: "Welcome",
  data() {
    return {
      feedback: null,
      lEmail: null,
      lPwd: null,
      user_name: null,
      email: null,
      password: null,
      uName: null,
      feedbackS: null,
      userName: null
    };
  },
  created() {},
  methods: {
    forget() {
      //now you can open modal from code
      $("#modal1").modal("open");

      //or by click on trigger
      //$(".trigger-modal").modal();
    },
    login() {
      this.showProgress(true);
      if (this.lEmail && this.lPwd) {
        //login
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.lEmail, this.lPwd)
          .then(cred => {
            //console.log(cred.user.uid);
            this.$router.push({
              name: "Dashboard",
              params: { uid: cred.user.uid }
            });
          })
          .catch(err => {
            this.showProgress(false);
            this.feedback = err;
          });
      } else {
        this.showProgress(false);
        this.feedback = "Enter Details";
      }
    },
    signUp() {
      this.showProgress(true);
      if (this.user_name && this.uName) {
        this.feedbackS = null;
        this.user_name = slugify(this.user_name, {
          replacement: "-",
          remove: /[$*_+~.(),@'"!\-:@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.user_name);
        ref
          .get()
          .then(doc => {
            if (doc.exists) {
              this.showProgress(false);
              this.feedbackS = "This User Name alreday exists, use another";
            } else {
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                  ref
                    .set({
                      user_name: this.user_name,
                      name: this.uName,
                      user_id: cred.user.uid
                    })
                    .then(() => {
                      this.showProgress(false);
                      this.$router.push({
                        name: "Dashboard",
                        params: { uid: cred.user.uid }
                      });
                    });
                })
                .catch(err => {
                  this.showProgress(false);
                  this.feedbackS = err.message;
                });
            }
          })
          .catch(err => {
            this.showProgress(false);
            this.feedbackS = err.message;
          });
      } else {
        this.showProgress(false);
        this.feedbackS = "Enter User Name Details";
      }
    },
    opnLogin() {
      $("#signup")
        .removeClass("active")
        .addClass("hide");
      $("#login")
        .addClass("active")
        .removeClass("hide");
    },
    opnSignup() {
      $("#login")
        .removeClass("active")
        .addClass("hide");
      $("#signup")
        .addClass("active")
        .removeClass("hide");
    },
    showProgress(val) {
      val
        ? $(".progress").removeClass("hide")
        : $(".progress").addClass("hide");
    }
  },
  beforeMount() {
    let us = firebase.auth().currentUser;
    if (us) {
      this.$router.push({
        name: "Dashboard",
        params: { uid: us.uid }
      });
    }
  }
};
</script>