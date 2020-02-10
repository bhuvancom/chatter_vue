import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyAW2d6Cq37AgcJFczosNJKbIQW6JtWaFBU",
    authDomain: "chatter-bafe2.firebaseapp.com",
    databaseURL: "https://chatter-bafe2.firebaseio.com",
    projectId: "chatter-bafe2",
    storageBucket: "chatter-bafe2.appspot.com",
    messagingSenderId: "383392326952",
    appId: "1:383392326952:web:efa7d3f6a39ccd6943dc1d"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();