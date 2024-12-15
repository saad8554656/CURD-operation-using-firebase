// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore , doc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBEMFVxQVJh92ldQU6pye99oxd2mnIg8KQ",
    authDomain: "curd-operations-1e03e.firebaseapp.com",
    projectId: "curd-operations-1e03e",
    storageBucket: "curd-operations-1e03e.firebasestorage.app",
    messagingSenderId: "17726151234",
    appId: "1:17726151234:web:eb0222cda4e51bd0a1abdb"
  };

  const app = initializeApp(firebaseConfig);

  // Firebase Services
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

export {auth, provider,signInWithPopup, doc ,setDoc,db };
