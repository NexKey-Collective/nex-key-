import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Sparkles,
  Bookmark,
  Boxes,
  Target,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
const Context = createContext(null);
const perks = [
  [Target, "Personalized match scores"],
  [Bookmark, "Save deals to your workspace"],
  [Boxes, "Create custom Buy Boxes"],
  [MessageSquare, "Connect directly with sellers"],
];
export function PublicSiteProvider({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    dialog.current.showModal();
    return () => {
      dialog.current?.close();
      previous?.focus();
    };
  }, [open]);
  const auth = (signup) => {
    setOpen(false);
    navigate(signup ? "/login?mode=signup" : "/login");
  };
  return (
    <Context.Provider
      value={{
        loggedIn: !!user,
        onBrowseDeals: () => navigate("/deals"),
        onGate: () => (user ? navigate("/my-buy-box") : setOpen(true)),
      }}
    >
      {children}
      {open && (
        <dialog
          ref={dialog}
          onCancel={() => setOpen(false)}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          className="public-auth-dialog"
          aria-labelledby="auth-gate-title"
        >
          <div className="relative px-7 pt-8 pb-7">
            <button
              autoFocus
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f6f1ea] grid place-items-center"
              aria-label="Close sign-up dialog"
            >
              <X size={17} />
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] bg-[#ffe4e5] text-brand">
              <Sparkles size={14} /> Free NexKey account
            </span>
            <h2
              id="auth-gate-title"
              className="mt-4 text-[22px] font-semibold leading-tight"
            >
              Unlock the full NexKey experience
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#8a8175]">
              Create a free NexKey account to personalize your investment
              criteria and save deals.
            </p>
            <div className="mt-5 grid gap-2.5">
              {perks.map(([Icon, label]) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl grid place-items-center bg-[#ffe4e5] text-brand">
                    <Icon size={16} />
                  </span>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-2.5">
              <button
                onClick={() => auth(true)}
                className="bg-brand text-white rounded-full py-3"
              >
                Sign Up
              </button>
              <button
                onClick={() => auth(false)}
                className="bg-[#f6f1ea] border border-[#ece5db] rounded-full py-3"
              >
                Log In
              </button>
            </div>
          </div>
        </dialog>
      )}
    </Context.Provider>
  );
}
export const usePublicSite = () => useContext(Context);
