// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <--- ဒီစာကြောင်းကို ထည့်ပေးရပါမယ်

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA28JdV09yY9mynR5U5P7Xj78mipByiy04",
  authDomain: "eyeclinic-40634.firebaseapp.com",
  projectId: "eyeclinic-40634",
  storageBucket: "eyeclinic-40634.firebasestorage.app",
  messagingSenderId: "221817320189",
  appId: "1:221817320189:web:089fc146b2d8409d924494",
  measurementId: "G-FXS6F854PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export db
export const db = getFirestore(app);