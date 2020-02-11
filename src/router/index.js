import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Chat from '@/components/Chat'
import firebase from 'firebase'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Welcome',
            component: Welcome,
            // beforeEnter(to, from, next) {
            //     if (from.params.currentUserName) {
            //         next({
            //             name: 'Dashboard',
            //             params: {
            //                 currentUserName: from.params.currentUserName
            //             }
            //         })
            //     } else {
            //         next();
            //     }
            // }
        },
        {
            path: '/Dashboard',
            name: 'Dashboard',
            props: true,
            component: Dashboard,
            meta: {
                requiresAuth: true,
            },
            beforeEnter(to, from, next) {
                if (to.params.uid) {
                    next();
                } else {
                    next({
                        name: 'Welcome'
                    })
                }
            }
        },
        {
            path: '/Profile',
            name: 'Profile',
            props: true,
            component: Profile,
            meta: {
                requiresAuth: true,
            },
            beforeEnter(to, from, next) {
                if (to.params.uid) {
                    next();
                } else {
                    next({
                        name: 'Welcome'
                    })
                }
            }
        }
    ]
})
router.beforeEach((to, from, next) => {
    //check to see if route requires auth
    if (to.matched.some(rout => rout.meta.requiresAuth)) {
        //check if sate of user is logged in
        let user = firebase.auth().currentUser;
        if (user) {
            //user signed in, proceed to route
            next()
        } else {
            // not logged in
            next({
                name: 'Welcome'
            })
        }
    } else {
        next();
    }
})
export default router;