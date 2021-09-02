import firebase from "firebase/compat/app"//v9
import "firebase/compat/auth";//v9
import "firebase/compat/firestore";//v9
import "firebase/functions";
import "firebase/storage";
import {firebaseConfig} from "./config";
console.log(firebaseConfig)

firebase.initializeApp(firebaseConfig); 
// export const auth = firebase.auth();
export const db = firebase.firestore();
// export const functions = firebase.functions();
// export const storage = firebase.storage();
// export const fb = firebase;
// export const FirebaseFieldValue = firebase.firestore.FieldValue
// export const FirebaseTimestamp = firebase.firestore.Timestamp;   