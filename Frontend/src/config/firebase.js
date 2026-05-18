import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWe2PdWBZcsIzbf-Hiov2rWvKtU4VnUCM",
  authDomain: "abcd-5e28f.firebaseapp.com",
  projectId: "abcd-5e28f",
  storageBucket: "abcd-5e28f.firebasestorage.app",
  messagingSenderId: "477394403761",
  appId: "1:477394403761:web:44bb16aa7e2006bb4b7d90",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();