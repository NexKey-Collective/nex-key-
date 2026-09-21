import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDealById } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { usePublicSite } from "../components/public/PublicSiteContext";
import { PublicPropertyDetail } from "../components/public/PropertyDetail";
const money = (n) => (n == null ? "—" : `$${Number(n).toLocaleString()}`);
export default function DealDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
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
      .catch(() => {
        if (!cancelled)
          setError("Unable to load this property. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);
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
    matchScore: null,
  };
  return (
    <PublicPropertyDetail
      key={id}
      deal={formatted}
      loggedIn={!!user}
      onBack={() => navigate("/deals")}
      onGate={onGate}
    />
  );
}
