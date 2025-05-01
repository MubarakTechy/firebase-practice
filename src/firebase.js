import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
