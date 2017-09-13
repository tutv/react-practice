import * as firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: "AIzaSyC-vGGbuhK01bTFlGQfFjsU_39idXkw0mU",
    authDomain: "react-prac-8ce01.firebaseapp.com",
    databaseURL: "https://react-prac-8ce01.firebaseio.com",
    projectId: "react-prac-8ce01",
    storageBucket: "react-prac-8ce01.appspot.com",
    messagingSenderId: "904605926295"
});

export default app.database();