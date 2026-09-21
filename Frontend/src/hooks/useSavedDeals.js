import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
export function useSavedDeals() {
  const { user } = useAuth();
  const key = user ? `nexkey-saved-deals:${user.uid}` : null;
  const [saved, setSaved] = useState(new Set());
  const [error, setError] = useState("");
  useEffect(() => {
    const read = () => {
      try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        setSaved(new Set(key && Array.isArray(value) ? value : []));
      } catch {
        setSaved(new Set());
      }
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener("nexkey-saved", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("nexkey-saved", read);
    };
  }, [key]);
  const toggle = (id) => {
    if (!key) return;
    try {
      const current = JSON.parse(localStorage.getItem(key) || "[]");
      const next = new Set(Array.isArray(current) ? current : []);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem(key, JSON.stringify([...next]));
      setSaved(next);
      setError("");
      window.dispatchEvent(new Event("nexkey-saved"));
    } catch {
      setError(
        "Saving is unavailable. Please enable browser storage and try again.",
      );
    }
  };
  return { saved, toggle, error };
}
