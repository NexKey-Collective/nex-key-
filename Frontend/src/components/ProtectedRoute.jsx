import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading, syncing, syncError, emailVerified } = useAuth();

  if (loading || syncing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ff5a5f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (syncError)
    return (
      <main className="p-8 text-center">
        Reconnect your account using the message above to continue.
      </main>
    );
  if (!emailVerified)
    return (
      <main className="p-8 text-center">
        Verify your email using the message above to manage your Buy Box and
        matches.
      </main>
    );
  return children;
}
