// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyD3lBOi0_LGi0HAfhvOYMMTfTawP3AVzS0",
  authDomain: "studyshot-77a61.firebaseapp.com",
  databaseURL: "https://studyshot-77a61-default-rtdb.firebaseio.com",
  projectId: "studyshot-77a61",
  storageBucket: "studyshot-77a61.firebasestorage.app",
  messagingSenderId: "469595440120",
  appId: "1:469595440120:web:22205f268faca6c379cc0d",
  measurementId: "G-BHTPGEHF4M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Initialize Firestore

export { auth, db };  // Export Firestore db along with auth
