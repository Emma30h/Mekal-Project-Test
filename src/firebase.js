// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWc3C5Mqb1iAa7KVBF80AMmVxWxoIkE0g",
  authDomain: "crud-iotech-2023.firebaseapp.com",
  projectId: "crud-iotech-2023",
  storageBucket: "crud-iotech-2023.appspot.com",
  messagingSenderId: "513707454835",
  appId: "1:513707454835:web:c47478b8bf2d68da2f1506"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Firebase Auth
export const auth = getAuth(app);

//Firebase Firestore
export const db = getFirestore(app)


