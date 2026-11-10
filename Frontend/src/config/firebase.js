import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyCAHr4xrMKdzj2qyj5dXBOVzvncDKm-WMo",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nexkey-core.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nexkey-core",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "nexkey-core.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "421829381086",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:421829381086:web:27a53e1c042f5eece6eb4f",
  measurementId: "G-WBSYJ9K0QV",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: [
    indexedDBLocalPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
  ],
});
export const googleProvider = new GoogleAuthProvider();
