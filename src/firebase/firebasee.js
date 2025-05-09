// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJF4NDcTxiDZIJKJcpboQxN32zddKlyJs",
  authDomain: "tech-e3ee9.firebaseapp.com",
  projectId: "tech-e3ee9",
  storageBucket: "tech-e3ee9.appspot.com", // ✅ fixed this line
  messagingSenderId: "674311202293",
  appId: "1:674311202293:web:d59ffb7ed673776458ecbc",
  measurementId: "G-XD2G7GSD5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export modules
export { auth, provider, db, app };
