// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueChatScroll from 'vue-chat-scroll'
import firebase from 'firebase'
import VueSession from 'vue-session'
Vue.use(VueSession)
Vue.use(VueChatScroll)

Vue.config.productionTip = false
let app = null;

firebase.auth().onAuthStateChanged(() => {
    /* eslint-disable no-new */

    //init app if not alreday created
    if (!app)
        app = new Vue({
            el: '#app',
            router,
            components: {
                App
            },
            template: '<App/>'
        })
})