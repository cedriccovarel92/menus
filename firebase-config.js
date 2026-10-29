// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSxSZIwSWm7mfxygmJfhCRHuKYlbYo58s",
  authDomain: "jojo-cooker.firebaseapp.com",
  projectId: "jojo-cooker",
  storageBucket: "jojo-cooker.firebasestorage.app",
  messagingSenderId: "291337384149",
  appId: "1:291337384149:web:baf389b05ceedefb31f25c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Les adresses Gmail autorisées. Mettez les MÊMES dans firestore.rules :
//    c'est ce fichier-là qui protège réellement les données.
window.ALLOWED_EMAILS = [
  "cedric.covarel.92@gmail.com",
  "aurelialaon@gmail.com"
];
