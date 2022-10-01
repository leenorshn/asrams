// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQsnvgHb6U8T8HEnHU_VYhtVnHQub9NvQ",
  authDomain: "merlinoka-1fe98.firebaseapp.com",
  projectId: "merlinoka-1fe98",
  storageBucket: "merlinoka-1fe98.appspot.com",
  messagingSenderId: "177160500816",
  appId: "1:177160500816:web:4580bbff0ec43f1ab6c355",
  measurementId: "G-Q88FKJX23L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//export const analytics = getAnalytics(app);
