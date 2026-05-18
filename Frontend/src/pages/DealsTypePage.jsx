import { useState, useEffect, useMemo } from "react";
import DealsTypeHeader from "../components/deals/DealsTypeHeader";
import DealsTypeGrid from "../components/deals/DealsTypeGrid";
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
  const { logout } = useAuth();
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

  const activeFilterCount = Object.keys(appliedPanelFilters).length;

  useEffect(() => {
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

        setDeals(results);
      } catch (err) {
        console.error("Failed to fetch deals:", err);
        setError("Failed to load deals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchDeals, searchQuery ? 400 : 0);
    return () => clearTimeout(timer);
  }, [activeFilter, searchQuery, inlineFilters, appliedPanelFilters]);

  const handleApplyPanel = (filters) => {
    setAppliedPanelFilters(filters);
  };

  const formattedDeals = useMemo(() => {
    return deals.map((deal) => ({
      id: deal.id,
      image: deal.listingImageUrl || "https://placehold.co/400x300?text=No+Image",
      badge: deal.dealType || null,
      exitStrategies: deal.exitStrategies || [],
      websiteTags: deal.websiteTags || [],
      price: deal.entryFee ? `$${deal.entryFee.toLocaleString()}` : "Contact",
      address: deal.address || deal.fullAddress || "Address unavailable",
      city: `${deal.city || ""}${deal.city && deal.state ? ", " : ""}${deal.state || ""}`,
      beds: deal.bedCount || "-",
      baths: deal.bathCount || "-",
      sqft: "-",
      statLabel: "Monthly",
      statValue: deal.totalMonthlyPayment
        ? `$${deal.totalMonthlyPayment.toLocaleString()}`
        : "-",
    }));
  }, [deals]);

  return (
    <div className="min-h-screen bg-white">
      <DealsTypeHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={logout}
        onInlineFilters={setInlineFilters}
        onApplyPanel={handleApplyPanel}
        panelFilters={panelFilters}
        onPanelFiltersChange={setPanelFilters}
        activeFilterCount={activeFilterCount}
      />

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-[#ff5a5f] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-red-500 text-[16px]">{error}</p>
        </div>
      ) : (
        <DealsTypeGrid deals={formattedDeals} />
      )}
    </div>
  );
}