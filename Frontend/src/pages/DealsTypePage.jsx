import { useState, useEffect, useMemo } from "react";
import BuyDealsBrowser from "../components/deals/BuyDealsBrowser";

import { getDeals } from "../services/api";
import { useAuth } from "../context/AuthContext";

const CREATIVE_SUBTYPES = ["Subto", "Hybrid", "Seller Finance"];

const DEFAULT_PANEL_FILTERS = {
  dealTypes: [],
  exitStrategies: [],
  monthlyMin: 0,
  monthlyMax: 5000,
  furnished: "any",
  pool: "any",
  multiUnit: "any",
};

export default function DealsTypePage() {
  const { user } = useAuth();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Inline header filters (beds, baths, entry fee, rate)
  const [inlineFilters, setInlineFilters] = useState({});

  // Panel filters — lifted up so state persists across open/close
  const [panelFilters, setPanelFilters] = useState(DEFAULT_PANEL_FILTERS);

  // Applied panel filters — only update when user hits "Apply"
  const [appliedPanelFilters, setAppliedPanelFilters] = useState({});

  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const fetchDeals = async () => {
      setLoading(true);
      setError("");

      try {
        const filters = { ...inlineFilters, ...appliedPanelFilters };

        if (searchQuery.trim()) {
          filters.q = searchQuery.trim();
        } else if (activeFilter === "Cash") {
          filters.dealType = "Cash";
        } else if (activeFilter === "Novation") {
          filters.dealType = "Novation";
        } else if (activeFilter === "Rent To Own") {
          filters.dealType = "Rent To Own";
        } else if (activeFilter === "Stack") {
          filters.dealType = "Stack";
        }

        const data = await getDeals(filters);
        let results = data.deals || [];

        // Client-side: Creative tab
        if (activeFilter === "Creative" && !searchQuery.trim()) {
          results = results.filter((d) => CREATIVE_SUBTYPES.includes(d.dealType));
        }

        // Client-side: filter by deal types from panel
        if (filters.dealTypes && filters.dealTypes.length > 0) {
          results = results.filter((deal) =>
            filters.dealTypes.includes(deal.dealType)
          );
        }

        // Client-side: filter by exit strategies
        if (filters.exitStrategies && filters.exitStrategies.length > 0) {
          results = results.filter((deal) =>
            deal.exitStrategies?.some((es) => filters.exitStrategies.includes(es))
          );
        }

        // Client-side: filter by monthly payment range
        if (filters.monthlyMin > 0 || filters.monthlyMax < 5000) {
          results = results.filter((deal) => {
            if (!deal.totalMonthlyPayment) return false;
            if (filters.monthlyMin && deal.totalMonthlyPayment < filters.monthlyMin) return false;
            if (filters.monthlyMax && deal.totalMonthlyPayment > filters.monthlyMax) return false;
            return true;
          });
        }

        if (activeFilter !== "All" && activeFilter !== "Creative") {
          results = results.filter((deal) => deal.dealType?.toLowerCase() === activeFilter.toLowerCase());
        }
        if (!cancelled) setDeals(results);
      } catch (err) {
        console.error("Failed to fetch deals:", err);
        if (!cancelled) setError("Failed to load deals. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const timer = setTimeout(fetchDeals, searchQuery ? 400 : 0);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [activeFilter, searchQuery, inlineFilters, appliedPanelFilters, retry]);

  const handleApplyPanel = (filters) => {
    setAppliedPanelFilters(filters);
  };

  const formattedDeals = useMemo(() => {
    return deals.map((deal) => ({
      id: deal.id,
      image: deal.listingImageUrl || "",
      amount: deal.entryFee == null ? null : Number(deal.entryFee),
      badge: deal.dealType || null,
      exitStrategies: deal.exitStrategies || [],
      websiteTags: deal.websiteTags || [],
      price: deal.entryFee ? `$${deal.entryFee.toLocaleString()}` : "Contact",
      address: deal.address || deal.fullAddress || "Address unavailable",
      city: `${deal.city || ""}${deal.city && deal.state ? ", " : ""}${deal.state || ""}`,
      state: deal.state || "",
      zipCode: deal.zipCode || "",
      metroArea: deal.metroArea || "",
      fullAddress: deal.fullAddress || "",
      beds: deal.bedCount || "-",
      baths: deal.bathCount || "-",
      sqft: "-",
      interestRate: deal.rateLoan == null ? "—" : `${(deal.rateLoan * 100).toFixed(2)}%`,
      statLabel: "Monthly",
      statValue: deal.totalMonthlyPayment
        ? `$${deal.totalMonthlyPayment.toLocaleString()}`
        : "-",
    }));
  }, [deals]);

  return (
    <BuyDealsBrowser
      deals={formattedDeals} loading={loading} error={error} user={user}
      activeFilter={activeFilter} onFilterChange={setActiveFilter}
      searchQuery={searchQuery} onSearchChange={setSearchQuery}
      panelFilters={panelFilters} onPanelFiltersChange={setPanelFilters}
      onApplyPanel={handleApplyPanel} onRetry={() => setRetry((value) => value + 1)}
      inlineFilters={inlineFilters} onInlineFilters={setInlineFilters}
    />
  );
}
