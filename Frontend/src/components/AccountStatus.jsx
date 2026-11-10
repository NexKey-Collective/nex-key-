import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
export default function AccountStatus() {
  const {
    user,
    emailVerified,
    syncError,
    syncing,
    retrySync,
    resendVerification,
    refreshVerification,
  } = useAuth();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setMessage("");
    setBusy(false);
  }, [user?.uid]);
  if (!user) return null;
  const run = async (action) => {
    setBusy(true);
    setMessage("");
    try {
      setMessage(await action());
    } catch {
      setMessage("Unable to complete that request. Please try again shortly.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-2" key={user.uid}>
      {syncError && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 text-red-800 p-4 flex flex-wrap gap-3 items-center"
        >
          <p className="flex-1">{syncError}</p>
          <button
            disabled={syncing}
            className="underline min-h-11"
            onClick={retrySync}
          >
            {syncing ? "Reconnecting…" : "Retry account sync"}
          </button>
        </div>
      )}
      {!emailVerified && (
        <div className="rounded-xl bg-amber-50 text-amber-950 p-4">
          <p>
            Verify your email to connect an existing Buy Box submission to your
            account.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              disabled={busy}
              className="underline min-h-11"
              onClick={() =>
                run(async () => {
                  await resendVerification();
                  return "Verification email sent. Check your inbox and spam folder.";
                })
              }
            >
              Resend verification email
            </button>
            <button
              disabled={busy}
              className="underline min-h-11"
              onClick={() =>
                run(async () =>
                  (await refreshVerification())
                    ? "Email verified. Your account has been refreshed."
                    : "Email is still unverified. Open the link in your email, then check again.",
                )
              }
            >
              I've verified my email
            </button>
          </div>
        </div>
      )}
      {message && (
        <p role="status" className="p-3 text-sm">
          {message}
        </p>
      )}
    </div>
  );
}
