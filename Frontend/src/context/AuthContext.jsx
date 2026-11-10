import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  browserPopupRedirectResolver,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { syncUser } from "../services/api";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [platformUser, setPlatformUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const generation = useRef(0);
  const retrySync = useCallback(async () => {
    const current = auth.currentUser;
    if (!current) return;
    const version = ++generation.current;
    setSyncing(true);
    setSyncError("");
    setPlatformUser(null);
    try {
      const data = await syncUser();
      if (
        version === generation.current &&
        auth.currentUser?.uid === current.uid
      )
        setPlatformUser(data.user);
    } catch {
      if (version === generation.current)
        setSyncError(
          "Your account could not finish loading. Retry to reconnect your Buy Box and preferences.",
        );
    } finally {
      if (version === generation.current) setSyncing(false);
    }
  }, []);
  useEffect(
    () =>
      onAuthStateChanged(auth, (current) => {
        generation.current++;
        setUser(current);
        setEmailVerified(Boolean(current?.emailVerified));
        setPlatformUser(null);
        setSyncError("");
        setSyncing(false);
        setLoading(false);
        if (current) retrySync();
      }),
    [retrySync],
  );
  const signupWithEmail = async (email, password) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // Account creation succeeded even if email delivery fails; banner offers resend.
    try {
      await sendEmailVerification(credential.user);
    } catch {
      /* recover via resend */
    }
    return credential.user;
  };
  const refreshVerification = async () => {
    if (!auth.currentUser) return;
    await reload(auth.currentUser);
    await auth.currentUser.getIdToken(true);
    setEmailVerified(auth.currentUser.emailVerified);
    if (auth.currentUser.emailVerified) await retrySync();
    return auth.currentUser.emailVerified;
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        platformUser,
        loading,
        syncing,
        syncError,
        emailVerified,
        retrySync,
        refreshVerification,
        loginWithEmail: async (email, password) =>
          (await signInWithEmailAndPassword(auth, email, password)).user,
        signupWithEmail,
        loginWithGoogle: async () =>
          (
            await signInWithPopup(
              auth,
              googleProvider,
              browserPopupRedirectResolver,
            )
          ).user,
        resetPassword: (email) => sendPasswordResetEmail(auth, email),
        resendVerification: () => sendEmailVerification(auth.currentUser),
        logout: () => signOut(auth),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
