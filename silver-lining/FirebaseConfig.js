// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhp5yg2kuGXS2eJ95T0UHPbS63Dy5BNbs",
    authDomain: "silver-lining-6b3ff.firebaseapp.com",
    projectId: "silver-lining-6b3ff",
    storageBucket: "silver-lining-6b3ff.firebasestorage.app",
    messagingSenderId: "98798288007",
    appId: "1:98798288007:web:b6dcf569cafcd183bbcc22",
    measurementId: "G-468BHG4F7R"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(FIREBASE_APP);TEST