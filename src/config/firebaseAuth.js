// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrAR0uPsRQqVpIlMqhbiT3NwQ0EmVuXKI",
  authDomain: "swiggy-project-703d2.firebaseapp.com",
  projectId: "swiggy-project-703d2",
  storageBucket: "swiggy-project-703d2.firebasestorage.app",
  messagingSenderId: "672615359850",
  appId: "1:672615359850:web:ef830afa14a75f99e0b113"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
    
const provider = new GoogleAuthProvider();

export { auth, provider };