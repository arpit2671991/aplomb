// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.firebase_api_key,
  authDomain: "aplomb-da7cb.firebaseapp.com",
  projectId: "aplomb-da7cb",
  storageBucket: "aplomb-da7cb.appspot.com",
  messagingSenderId: "153800605638",
  appId: "1:153800605638:web:f03ec36c31fda0f0de7cc7",
  measurementId: "G-N2LXLXGLX3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


