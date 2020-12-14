import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB9m3g4xaJKe_2rEAKP1U2TyEQ0kii73ak",
  authDomain: "links-crud-react.firebaseapp.com",
  projectId: "links-crud-react",
  storageBucket: "links-crud-react.appspot.com",
  messagingSenderId: "98227855824",
  appId: "1:98227855824:web:cec47a90345aa8758799d5",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
