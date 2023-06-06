// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV1PR7MfZxghFIiqvC5gzUCLglWP5b_PM",
  authDomain: "dontknow-bb7e9.firebaseapp.com",
  projectId: "dontknow-bb7e9",
  storageBucket: "dontknow-bb7e9.appspot.com",
  messagingSenderId: "181148441587",
  appId: "1:181148441587:web:af72e73a694c15183d1086",
  measurementId: "G-C4CV0XNV62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);