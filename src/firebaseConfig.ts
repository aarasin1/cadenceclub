// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT0gF8WfNDShks9mbQKv0w2rL9PK6HXtg",
  authDomain: "cadenceclubgolf.firebaseapp.com",
  projectId: "cadenceclubgolf",
  storageBucket: "cadenceclubgolf.firebasestorage.app",
  messagingSenderId: "842579490610",
  appId: "1:842579490610:web:9f9d6a9fe4a02a5d32492b",
  measurementId: "G-NSLCRQBWGT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
