import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Map,
  LayoutGrid,
  List,
  Grid3x3,
  Table,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import FilterPanel from "./FilterPanel";
import {
  GridCard,
  CompactCard,
  ListRow,
  MapListCard,
  TableView,
} from "./DealCards";
import { usePublicSite } from "../public/PublicSiteContext";
import { useSavedDeals } from "../../hooks/useSavedDeals";
import "./buy-deals.css";
import { matchesLocation } from "../../utils/locationSearch";
const DealsMap = lazy(() => import("./DealsMap"));
const TYPES = ["All", "Seller Finance", "SubTo", "Cash", "Hybrid"];
const VIEWS = [
  ["map", "Map View", Map],
  ["grid", "Grid View", LayoutGrid],
  ["list", "List View", List],
  ["compact", "Compact Grid View", Grid3x3],
  ["table", "Table View", Table],
];
const VIEW_KEY = "nexkey.public.buydeals.view";
export default function BuyDealsBrowser({
  deals,
  loading,
  error,
  user,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  panelFilters,
  onPanelFiltersChange,
  onApplyPanel,
  onRetry,
  inlineFilters,
  onInlineFilters,
}) {
  const [view, setView] = useState(() => {
    try {
      const v = localStorage.getItem(VIEW_KEY);
      return VIEWS.some(([id]) => id === v) ? v : "map";
    } catch {
      return "map";
    }
  });
  const [sort, setSort] = useState("asc");
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { onGate } = usePublicSite();
  const { saved, toggle, error: saveError } = useSavedDeals();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      localStorage.setItem(VIEW_KEY, view);
    } catch {}
  }, [view]);
  useEffect(
    () => setPage(1),
    [view, sort, searchQuery, activeFilter, location],
  );
  const results = useMemo(
    () =>
      deals
        .filter((d) => matchesLocation(d, location))
        .sort((a, b) => {
          if (a.amount == null) return b.amount == null ? 0 : 1;
          if (b.amount == null) return -1;
          return sort === "asc" ? a.amount - b.amount : b.amount - a.amount;
        })
        .map((d) => ({
          ...d,
          name: d.address,
          location: d.city,
          dealType: d.badge,
          entryFee: d.price,
          monthlyPayment: d.statValue,
          interestRate: d.interestRate || "—",
          priceLabel: "Entry Fee",
          matchScore: null,
        })),
    [deals, location, sort],
  );
  const pageSize =
    view === "table" ? 10 : view === "compact" ? 8 : view === "list" ? 5 : 6;
  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged =
    view === "map"
      ? results
      : results.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const save = (id) => () => (user ? toggle(id) : onGate());
  const select = (id) => {
    setSelected(id);
    document
      .getElementById(`property-${id}`)
      ?.scrollIntoView({ block: "nearest", behavior: "auto" });
  };
  const viewDeal = (d) => navigate(`/deals/${d.id}`);
  const clear = () => {
    onSearchChange("");
    setLocation("");
    onFilterChange("All");
    onApplyPanel({});
    onInlineFilters({});
    onPanelFiltersChange({});
  };
  const cardProps = (d) => ({
    d,
    loggedIn: !!user,
    saved: saved.has(d.id),
    onSave: save(d.id),
    onView: () => viewDeal(d),
  });
  return (
    <main className="buy-deals figma-buy-deals public-site">
      <div className="mb-5">
        <h1>Browse Buy Deals</h1>
        <p className="bd-intro">
          {user ? (
            "Explore off-market opportunities, save your favorites, and find your next investment."
          ) : (
            <>
              Explore off-market opportunities.{" "}
              <button
                className="text-brand underline underline-offset-2"
                onClick={onGate}
              >
                Create a free account
              </button>{" "}
              to unlock match scores, save deals, and AI recommendations.
            </>
          )}
        </p>
      </div>
      <div className="bd-toolbar">
        <label className="bd-search">
          <Search size={17} />
          <input
            type="search"
            aria-label="Search property, city, or deal type"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search property, city, or deal type"
          />
        </label>
        <div className="bd-display-controls">
          <label className="bd-sort">
            <span>Sort:</span>
            <select
              aria-label="Sort by entry fee"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="asc">Entry Fee: Low to High</option>
              <option value="desc">Entry Fee: High to Low</option>
            </select>
          </label>
          <div className="bd-views" role="group" aria-label="Property view">
            {VIEWS.map(([id, label, Icon]) => (
              <button
                key={id}
                title={label}
                aria-label={label}
                aria-pressed={view === id}
                className={view === id ? "active" : ""}
                onClick={() => setView(id)}
              >
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bd-filter-row">
        <div className="bd-filters">
          {TYPES.map((type) => (
            <button
              key={type}
              aria-pressed={activeFilter === type}
              className={activeFilter === type ? "active" : ""}
              onClick={() => onFilterChange(type)}
            >
              {type}
            </button>
          ))}
          <button
            className="inline-flex items-center gap-1.5"
            onClick={() => setPanelOpen(true)}
          >
            <SlidersHorizontal size={14} /> More filters
          </button>
          <select
            className="bd-beds"
            aria-label="Minimum bedrooms"
            value={inlineFilters.minBeds || ""}
            onChange={(e) =>
              onInlineFilters({
                ...inlineFilters,
                minBeds: Number(e.target.value) || undefined,
              })
            }
          >
            <option value="">Beds: Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+ beds
              </option>
            ))}
          </select>
        </div>
        <span className="bd-count" role="status">
          {loading ? "Loading…" : `${results.length} properties`}
        </span>
      </div>
      {saveError && (
        <p role="alert" className="mb-3 text-red-700">
          {saveError}
        </p>
      )}
      {loading ? (
        <div className="bd-state" role="status">
          <span className="bd-spinner" />
          Loading properties…
        </div>
      ) : error ? (
        <div className="bd-state" role="alert">
          <p>{error}</p>
          <button onClick={onRetry}>Try again</button>
        </div>
      ) : !results.length && view !== "map" ? (
        <div className="bd-state">
          <h2>No properties found</h2>
          <p>Try a different search or clear your filters.</p>
          <button onClick={clear}>Clear filters</button>
        </div>
      ) : (
        <>
          {view === "map" ? (
            <div className="bd-results bd-view-map">
              <Suspense
                fallback={<div className="bd-map bd-state">Loading map…</div>}
              >
                <DealsMap
                  deals={results}
                  selected={selected}
                  onSelect={select}
                  location={location}
                  onLocationChange={setLocation}
                />
              </Suspense>
              <div className="bd-properties">
                {!results.length && <div className="bd-state" role="status"><h2>No properties found</h2><p>Try another ZIP, city, area, or state.</p><button onClick={() => setLocation("")}>Clear map search</button><button onClick={clear}>Clear all filters</button></div>}
                {results.map((d) => (
                  <MapListCard
                    key={d.id}
                    {...cardProps(d)}
                    active={selected === d.id}
                    onHover={setSelected}
                  />
                ))}
              </div>
            </div>
          ) : view === "table" ? (
            <TableView
              deals={paged}
              loggedIn={!!user}
              favs={saved}
              onSaveFor={save}
              onViewDeal={viewDeal}
              onGate={onGate}
            />
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : view === "compact"
                    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                    : "space-y-4"
              }
            >
              {paged.map((d) =>
                view === "grid" ? (
                  <GridCard key={d.id} {...cardProps(d)} />
                ) : view === "compact" ? (
                  <CompactCard key={d.id} {...cardProps(d)} />
                ) : (
                  <ListRow key={d.id} {...cardProps(d)} />
                ),
              )}
            </div>
          )}
          {view !== "map" && totalPages > 1 && (
            <nav
              className="mt-6 flex flex-wrap justify-center items-center gap-2"
              aria-label="Property pages"
            >
              <button
                className="bd-page"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (n) =>
                    n === 1 ||
                    n === totalPages ||
                    Math.abs(n - currentPage) <= 2,
                )
                .map((n, i, arr) => (
                  <span key={n} className="inline-flex items-center gap-2">
                    {i > 0 && n - arr[i - 1] > 1 && <span>…</span>}
                    <button
                      className={`bd-page ${n === currentPage ? "active" : ""}`}
                      aria-current={n === currentPage ? "page" : undefined}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  </span>
                ))}
              <button
                className="bd-page"
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </nav>
          )}
        </>
      )}
      {panelOpen && (
        <FilterPanel
          values={panelFilters}
          onChange={onPanelFiltersChange}
          onApply={onApplyPanel}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </main>
  );
}
