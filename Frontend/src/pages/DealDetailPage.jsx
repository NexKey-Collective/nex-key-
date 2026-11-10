import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDealById, getMatchScore } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { usePublicSite } from "../components/public/PublicSiteContext";
import { PublicPropertyDetail } from "../components/public/PropertyDetail";
const money = (n) => (n == null ? "—" : `$${Number(n).toLocaleString()}`);
export default function DealDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, platformUser, syncing, syncError, emailVerified } = useAuth();
  const [match, setMatch] = useState(null);
  const [matchError, setMatchError] = useState("");
  const [matchRetry, setMatchRetry] = useState(0);
  const [retry, setRetry] = useState(0);
  const { onGate } = usePublicSite();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getDealById(id)
      .then((data) => {
        if (!cancelled) setDeal(data.deal);
      })
      .catch((error) => {
        if (!cancelled)
          setError(
            error.status === 404
              ? "This property is no longer available. It may have been sold or removed."
              : "Unable to load this property. Please try again.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id, retry]);
  useEffect(() => {
    let cancelled = false;
    setMatch(null);
    setMatchError("");
    if (emailVerified && user && platformUser && !syncing && !syncError)
      getMatchScore(id)
        .then((data) => {
          if (!cancelled) setMatch({ ...data, uid: user.uid });
        })
        .catch((error) => {
          if (!cancelled)
            setMatchError(
              error.code === "BUY_BOX_REQUIRED"
                ? "Set up your Buy Box to see a personalized match score."
                : "Match score is temporarily unavailable.",
            );
        });
    return () => {
      cancelled = true;
    };
  }, [
    id,
    user?.uid,
    platformUser,
    syncing,
    syncError,
    emailVerified,
    matchRetry,
  ]);
  if (loading)
    return (
      <div className="min-h-[60vh] grid place-items-center" role="status">
        Loading property…
      </div>
    );
  if (error || !deal)
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center gap-4"
        role="alert"
      >
        <p>{error || "Property not found."}</p>
        <button
          className="underline min-h-11"
          onClick={() => setRetry((value) => value + 1)}
        >
          Try again
        </button>
        <Link to="/deals" className="text-brand underline">
          Back to Buy Deals
        </Link>
      </div>
    );
  const formatted = {
    id: deal.id,
    raw: deal,
    name: deal.address || deal.fullAddress || "Property",
    location:
      [deal.city, deal.state].filter(Boolean).join(", ") +
      (deal.zipCode ? ` ${deal.zipCode}` : ""),
    image: deal.listingImageUrl,
    dealType: deal.dealType,
    price: money(deal.entryFee),
    entryFee: money(deal.entryFee),
    monthlyPayment: money(deal.totalMonthlyPayment),
    interestRate:
      deal.rateLoan == null ? "—" : `${(deal.rateLoan * 100).toFixed(2)}%`,
    beds: deal.bedCount || "—",
    baths: deal.bathCount || "—",
    sqft: "—",
    matchScore:
      user && match?.uid === user.uid && !syncing && !syncError
        ? match.matchScore
        : null,
    matchReasons: match?.uid === user?.uid ? match?.matchReasons || [] : [],
  };
  return (
    <PublicPropertyDetail
      key={id}
      matchError={matchError}
      onRetryMatch={() => setMatchRetry((value) => value + 1)}
      deal={formatted}
      loggedIn={!!user}
      onBack={() => navigate("/deals")}
      onGate={onGate}
    />
  );
}
