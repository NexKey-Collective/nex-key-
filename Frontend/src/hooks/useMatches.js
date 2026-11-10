import { useEffect, useState } from "react";
import { getMatches } from "../services/api";
import { useAuth } from "../context/AuthContext";
export function useMatches() {
  const { user, platformUser, syncing, syncError, emailVerified } = useAuth();
  const [state, setState] = useState({
    uid: null,
    scores: {},
    loading: false,
    error: "",
    needsBuyBox: false,
  });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!emailVerified || !user || !platformUser || syncing || syncError)
      return;
    let cancelled = false;
    setState({
      uid: user.uid,
      scores: {},
      loading: true,
      error: "",
      needsBuyBox: false,
    });
    getMatches()
      .then((data) => {
        if (!cancelled)
          setState({
            uid: user.uid,
            scores: Object.fromEntries(
              (data.scores || data.matches).map((deal) => [deal.id, deal]),
            ),
            loading: false,
            error: "",
            needsBuyBox: false,
          });
      })
      .catch((error) => {
        if (!cancelled)
          setState({
            uid: user.uid,
            scores: {},
            loading: false,
            needsBuyBox: error.code === "BUY_BOX_REQUIRED",
            error:
              error.code === "BUY_BOX_REQUIRED"
                ? ""
                : "Match scores could not load.",
          });
      });
    return () => {
      cancelled = true;
    };
  }, [user?.uid, platformUser, syncing, syncError, emailVerified, retry]);
  const visible =
    emailVerified && state.uid === user?.uid && !syncing && !syncError
      ? state
      : { scores: {}, loading: false, error: "", needsBuyBox: false };
  return { ...visible, retry: () => setRetry((value) => value + 1) };
}
