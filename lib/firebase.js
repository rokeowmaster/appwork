// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // Optional

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_Ndlx21r59iU_QsS25g-s7Y-Fnt840dQ",
  authDomain: "appwork-44ffe.firebaseapp.com",
  projectId: "appwork-44ffe",
  storageBucket: "appwork-44ffe.appspot.com", // fixed typo: .app → .appspot.com
  messagingSenderId: "922161707802",
  appId: "1:922161707802:web:5a075ddf1c4209020dcaa3",
  measurementId: "G-HF0KQN2CHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Export for use in your app
export { db, auth };
