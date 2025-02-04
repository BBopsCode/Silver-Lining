// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA01ynkK_CbO_TCG6GEvk9L5pvgkJ-Kxok",
    authDomain: "silver-lining-e1df0.firebaseapp.com",
    projectId: "silver-lining-e1df0",
    storageBucket: "silver-lining-e1df0.firebasestorage.app",
    messagingSenderId: "418486346742",
    appId: "1:418486346742:web:babaff32d0f8be5ef6ddd7",
    measurementId: "G-SX7M9B417Q"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app)
