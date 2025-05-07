import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJF4NDcTxiDZIJKJcpboQxN32zddKlyJs",
  authDomain: "tech-e3ee9.firebaseapp.com",
  projectId: "tech-e3ee9",
  storageBucket: "tech-e3ee9.firebasestorage.app",
  messagingSenderId: "674311202293",
  appId: "1:674311202293:web:d59ffb7ed673776458ecbc",
  measurementId: "G-XD2G7GSD5F"
};





const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };