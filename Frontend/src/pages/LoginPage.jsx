import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { loginWithEmail, signupWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await signupWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate("/deals");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate("/deals");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-black/[0.08] w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
              <rect width="48" height="48" rx="10" fill="#ff5a5f" fillOpacity="0.12" />
              <path d="M24 10L8 22V38H18V28H30V38H40V22L24 10Z" fill="#ff5a5f" />
              <rect x="21" y="31" width="6" height="7" rx="1" fill="white" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span
              className="text-[#ff5a5f] text-2xl leading-none tracking-[-0.6px]"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              NexKey
            </span>
            <span
              className="text-[#ff5a5f] text-[11px] tracking-[1.2px] uppercase leading-none mt-0.5"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              COLLECTIVE
            </span>
          </div>
        </div>

        <h2
          className="text-[24px] text-[#1a1a1a] text-center mb-6"
          style={{ fontFamily: "'Archivo Black', sans-serif" }}
        >
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-[14px] rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#f7f7f7] border border-black/[0.08] rounded-xl px-4 py-3 text-[16px] text-[#1a1a1a] placeholder:text-[rgba(26,26,26,0.5)] outline-none focus:ring-2 focus:ring-[#ff5a5f]/30 focus:border-[#ff5a5f]/30"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full bg-[#f7f7f7] border border-black/[0.08] rounded-xl px-4 py-3 text-[16px] text-[#1a1a1a] placeholder:text-[rgba(26,26,26,0.5)] outline-none focus:ring-2 focus:ring-[#ff5a5f]/30 focus:border-[#ff5a5f]/30"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#ff5a5f] text-white text-[16px] font-bold py-3 rounded-xl shadow-[0_4px_6px_rgba(255,90,95,0.25)] hover:bg-[#e0484d] transition-all duration-200 active:scale-95 disabled:opacity-50"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {loading ? "Loading..." : isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-5">
          <div className="flex-1 h-px bg-black/[0.08]" />
          <span className="text-[13px] text-[#717171]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            or
          </span>
          <div className="flex-1 h-px bg-black/[0.08]" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-black/[0.08] rounded-xl py-3 text-[16px] font-medium text-[#1a1a1a] hover:bg-[#f7f7f7] transition-all disabled:opacity-50"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <p
          className="text-center text-[14px] text-[#717171] mt-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-[#ff5a5f] font-medium hover:underline"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}