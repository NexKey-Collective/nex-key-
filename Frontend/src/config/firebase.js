import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAHr4xrMKdzj2qyj5dXBOVzvncDKm-WMo",
  authDomain: "nexkey-core.firebaseapp.com",
  projectId: "nexkey-core",
  storageBucket: "nexkey-core.firebasestorage.app",
  messagingSenderId: "421829381086",
  appId: "1:421829381086:web:27a53e1c042f5eece6eb4f",
  measurementId: "G-WBSYJ9K0QV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);