// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Ndlx21r59iU_QsS25g-s7Y-Fnt840dQ",
  authDomain: "appwork-44ffe.firebaseapp.com",
  projectId: "appwork-44ffe",
  storageBucket: "appwork-44ffe.firebasestorage.app",
  messagingSenderId: "922161707802",
  appId: "1:922161707802:web:5a075ddf1c4209020dcaa3",
  measurementId: "G-HF0KQN2CHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const analytics = getAnalytics(app);

export { db, app, analytics };