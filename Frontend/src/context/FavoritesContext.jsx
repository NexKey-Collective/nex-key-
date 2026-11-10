import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { getFavorites, setFavorite } from "../services/api";
const Context = createContext(null);
export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [state, setState] = useState({
    uid: null,
    saved: new Set(),
    error: "",
    loading: false,
  });
  const [retry, setRetry] = useState(0);
  const generation = useRef(0);
  const pending = useRef(new Set());
  useEffect(() => {
    const version = ++generation.current;
    pending.current.clear();
    if (!user) {
      setState({ uid: null, saved: new Set(), error: "", loading: false });
      return;
    }
    const uid = user.uid;
    setState({ uid, saved: new Set(), error: "", loading: true });
    (async () => {
      try {
        const { ids } = await getFavorites();
        if (generation.current !== version) return;
        const saved = new Set(ids);
        // Import local favorites once; only clear after every upload succeeds.
        const key = `nexkey-saved-deals:${uid}`;
        let local = [];
        try {
          const value = JSON.parse(localStorage.getItem(key) || "[]");
          if (Array.isArray(value))
            local = value.filter(
              (id) => typeof id === "string" && /^rec[a-zA-Z0-9]{14}$/.test(id),
            );
        } catch {
          /* storage may be disabled */
        }
        for (const id of local) {
          if (generation.current !== version) return;
          if (!saved.has(id)) {
            await setFavorite(id, true);
            saved.add(id);
          }
        }
        if (generation.current !== version) return;
        try {
          localStorage.removeItem(key);
        } catch {
          /* optional legacy storage */
        }
        setState({ uid, saved, error: "", loading: false });
      } catch {
        if (generation.current === version)
          setState({
            uid,
            saved: new Set(),
            error: "Saved deals could not load. Retry before making changes.",
            loading: false,
          });
      }
    })();
    return () => {
      generation.current++;
    };
  }, [user?.uid, retry]);
  const toggle = async (id) => {
    if (
      !user ||
      state.uid !== user.uid ||
      state.loading ||
      state.error ||
      pending.current.has(id)
    )
      return;
    const version = generation.current;
    const uid = user.uid;
    const saved = !state.saved.has(id);
    pending.current.add(id);
    try {
      await setFavorite(id, saved);
      if (version === generation.current)
        setState((previous) => {
          const next = new Set(previous.saved);
          saved ? next.add(id) : next.delete(id);
          return { ...previous, saved: next, error: "" };
        });
    } catch {
      if (version === generation.current)
        setState((previous) => ({
          ...previous,
          error: "Unable to save your change. Retry to reload saved deals.",
        }));
    } finally {
      if (version === generation.current) pending.current.delete(id);
    }
  };
  const visible =
    state.uid === user?.uid
      ? state
      : { saved: new Set(), error: "", loading: false };
  return (
    <Context.Provider
      value={{
        ...visible,
        toggle,
        retry: () => setRetry((value) => value + 1),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useFavorites = () => useContext(Context);
