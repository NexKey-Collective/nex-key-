import { useEffect, useState } from "react";
import {
  getBuyBox,
  saveBuyBox,
  getMatchSettings,
  saveMatchSettings,
} from "../services/api";

const STRATEGY_OPTIONS = [
  "Cash",
  "Novation",
  "Rent To Own",
  "Stack",
  "Subto",
  "Hybrid",
  "Seller Finance",
];

const DEFAULT_WEIGHTS = {
  dealType: 30,
  location: 30,
  state: 25,
  city: 5,
  entryFee: 20,
  exitStrategy: 15,
  bedrooms: 7,
  bathrooms: 6,
};

const WEIGHT_LABELS = {
  dealType: "Deal type match",
  location: "Location (zip/radius)",
  state: "State match",
  city: "City match",
  entryFee: "Entry fee fit",
  exitStrategy: "Exit strategy match",
  bedrooms: "Bedrooms",
  bathrooms: "Bathrooms",
};

const EMPTY_BUY_BOX = {
  preferredStates: "",
  preferredCities: "",
  buyingStrategies: [],
  purchasePriceMax: "",
  entryFeeMax: "",
  bedroomsMin: "",
  bathroomsMin: "",
};

function toCsv(value) {
  return Array.isArray(value) ? value.join(", ") : value || "";
}

function fromCsv(value) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function MyBuyBoxPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [buyBoxExists, setBuyBoxExists] = useState(false);
  const [buyBoxForm, setBuyBoxForm] = useState(EMPTY_BUY_BOX);
  const [savingBuyBox, setSavingBuyBox] = useState(false);
  const [buyBoxMessage, setBuyBoxMessage] = useState("");
  const [buyBoxError, setBuyBoxError] = useState("");

  const [matchForm, setMatchForm] = useState({
    zipCode: "",
    radiusMiles: "",
    weights: DEFAULT_WEIGHTS,
  });
  const [savingMatch, setSavingMatch] = useState(false);
  const [matchMessage, setMatchMessage] = useState("");
  const [matchError, setMatchError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [buyBox, settings] = await Promise.all([
          getBuyBox(),
          getMatchSettings(),
        ]);

        if (buyBox) {
          setBuyBoxExists(true);
          setBuyBoxForm({
            preferredStates: toCsv(buyBox.preferredStates),
            preferredCities: toCsv(buyBox.preferredCities),
            buyingStrategies: buyBox.buyingStrategies
              ? fromCsv(toCsv(buyBox.buyingStrategies))
              : [],
            purchasePriceMax: buyBox.purchasePriceMax ?? "",
            entryFeeMax: buyBox.entryFeeMax ?? "",
            bedroomsMin: buyBox.bedroomsMin ?? "",
            bathroomsMin: buyBox.bathroomsMin ?? "",
          });
        }

        if (settings) {
          setMatchForm({
            zipCode: settings.zipCode || "",
            radiusMiles: settings.radiusMiles ?? "",
            weights: { ...DEFAULT_WEIGHTS, ...(settings.weights || {}) },
          });
        }
      } catch (err) {
        setLoadError(err.message || "Failed to load your Buy Box.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleStrategy = (strategy) => {
    setBuyBoxForm((prev) => ({
      ...prev,
      buyingStrategies: prev.buyingStrategies.includes(strategy)
        ? prev.buyingStrategies.filter((s) => s !== strategy)
        : [...prev.buyingStrategies, strategy],
    }));
  };

  const handleBuyBoxSubmit = async (e) => {
    e.preventDefault();
    setSavingBuyBox(true);
    setBuyBoxMessage("");
    setBuyBoxError("");

    try {
      const payload = {
        preferredStates: fromCsv(buyBoxForm.preferredStates),
        preferredCities: fromCsv(buyBoxForm.preferredCities),
        buyingStrategies: buyBoxForm.buyingStrategies,
        purchasePriceMax: buyBoxForm.purchasePriceMax
          ? Number(buyBoxForm.purchasePriceMax)
          : null,
        entryFeeMax: buyBoxForm.entryFeeMax
          ? Number(buyBoxForm.entryFeeMax)
          : null,
        bedroomsMin: buyBoxForm.bedroomsMin
          ? Number(buyBoxForm.bedroomsMin)
          : null,
        bathroomsMin: buyBoxForm.bathroomsMin
          ? Number(buyBoxForm.bathroomsMin)
          : null,
      };

      await saveBuyBox(payload, buyBoxExists);
      setBuyBoxExists(true);
      setBuyBoxMessage("Buy Box saved.");
    } catch (err) {
      setBuyBoxError(err.message || "Failed to save Buy Box.");
    } finally {
      setSavingBuyBox(false);
    }
  };

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
    setSavingMatch(true);
    setMatchMessage("");
    setMatchError("");

    try {
      const payload = {
        zipCode: matchForm.zipCode || null,
        radiusMiles: matchForm.radiusMiles ? Number(matchForm.radiusMiles) : null,
        weights: matchForm.weights,
      };

      await saveMatchSettings(payload);
      setMatchMessage("Match settings saved.");
    } catch (err) {
      setMatchError(err.message || "Failed to save match settings.");
    } finally {
      setSavingMatch(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-[32px] font-bold text-dark tracking-tight mb-2">
          My Buy Box
        </h1>
        <p className="text-[15px] text-text-muted mb-10">
          Tell us what you're looking for so we can match you with the right deals.
        </p>

        {loadError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-[14px] rounded-xl px-4 py-3 mb-6">
            {loadError}
          </div>
        )}

        {/* Buy Box criteria */}
        <form
          onSubmit={handleBuyBoxSubmit}
          className="bg-white border border-black/[0.06] rounded-2xl p-8 mb-8"
        >
          <h2 className="text-[20px] font-bold text-dark mb-6">Buy Box Criteria</h2>

          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-text-body">
                Preferred states
              </span>
              <input
                type="text"
                placeholder="TX, FL, GA"
                value={buyBoxForm.preferredStates}
                onChange={(e) =>
                  setBuyBoxForm((p) => ({ ...p, preferredStates: e.target.value }))
                }
                className="bg-bg-light border border-black/[0.08] rounded-xl px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-text-body">
                Preferred cities
              </span>
              <input
                type="text"
                placeholder="Dallas, Tampa"
                value={buyBoxForm.preferredCities}
                onChange={(e) =>
                  setBuyBoxForm((p) => ({ ...p, preferredCities: e.target.value }))
                }
                className="bg-bg-light border border-black/[0.08] rounded-xl px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-text-body">
                Max purchase price
              </span>
              <input
                type="number"
                min="0"
                placeholder="$"
                value={buyBoxForm.purchasePriceMax}
                onChange={(e) =>
                  setBuyBoxForm((p) => ({ ...p, purchasePriceMax: e.target.value }))
                }
                className="bg-bg-light border border-black/[0.08] rounded-xl px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-text-body">
                Max entry fee
              </span>
              <input
                type="number"
                min="0"
                placeholder="$"
                value={buyBoxForm.entryFeeMax}
                onChange={(e) =>
                  setBuyBoxForm((p) => ({ ...p, entryFeeMax: e.target.value }))
                }
                className="bg-bg-light border border-black/[0.08] rounded-xl px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-text-body">
                Min bedrooms
              </span>
              <input
                type="number"
                min="0"
                value={buyBoxForm.bedroomsMin}
                onChange={(e) =>
                  setBuyBoxForm((p) => ({ ...p, bedroomsMin: e.target.value }))
                }
                className="bg-bg-light border border-black/[0.08] rounded-xl px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-text-body">
                Min bathrooms
              </span>
              <input
                type="number"
                min="0"
                value={buyBoxForm.bathroomsMin}
                onChange={(e) =>
                  setBuyBoxForm((p) => ({ ...p, bathroomsMin: e.target.value }))
                }
                className="bg-bg-light border border-black/[0.08] rounded-xl px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40"
              />
            </label>
          </div>

          <div className="mb-6">
            <span className="text-[13px] font-medium text-text-body block mb-2.5">
              Deal types you buy
            </span>
            <div className="flex flex-wrap gap-2">
              {STRATEGY_OPTIONS.map((strategy) => {
                const active = buyBoxForm.buyingStrategies.includes(strategy);
                return (
                  <button
                    key={strategy}
                    type="button"
                    onClick={() => toggleStrategy(strategy)}
                    className={[
                      "px-4 py-2 rounded-full text-[13px] font-medium border transition-all",
                      active
                        ? "bg-brand/10 border-brand text-brand"
                        : "bg-white border-black/[0.10] text-text-body hover:border-black/20",
                    ].join(" ")}
                  >
                    {strategy}
                  </button>
                );
              })}
            </div>
          </div>

          {buyBoxMessage && (
            <p className="text-[13px] text-green-600 mb-4">{buyBoxMessage}</p>
          )}
          {buyBoxError && (
            <p className="text-[13px] text-red-600 mb-4">{buyBoxError}</p>
          )}

          <button
            type="submit"
            disabled={savingBuyBox}
            className="bg-brand text-white text-[15px] font-semibold px-6 py-2.5 rounded-full hover:bg-brand-dark transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            {savingBuyBox ? "Saving..." : "Save Buy Box"}
          </button>
        </form>

        {/* Match settings */}
        <form
          onSubmit={handleMatchSubmit}
          className="bg-white border border-black/[0.06] rounded-2xl p-8"
        >
          <h2 className="text-[20px] font-bold text-dark mb-2">Match Settings</h2>
          <p className="text-[14px] text-text-muted mb-6">
            Set a zip code and radius to match on distance instead of state/city, and
            adjust how much each factor matters when we score deals for you.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-text-body">Zip code</span>
              <input
                type="text"
                placeholder="75201"
                value={matchForm.zipCode}
                onChange={(e) =>
                  setMatchForm((p) => ({ ...p, zipCode: e.target.value }))
                }
                className="bg-bg-light border border-black/[0.08] rounded-xl px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-text-body">
                Radius (miles)
              </span>
              <input
                type="number"
                min="0"
                placeholder="25"
                value={matchForm.radiusMiles}
                onChange={(e) =>
                  setMatchForm((p) => ({ ...p, radiusMiles: e.target.value }))
                }
                className="bg-bg-light border border-black/[0.08] rounded-xl px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            {Object.keys(DEFAULT_WEIGHTS).map((key) => (
              <div key={key} className="flex items-center gap-4">
                <span className="text-[14px] text-text-body w-48 shrink-0">
                  {WEIGHT_LABELS[key]}
                </span>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={matchForm.weights[key]}
                  onChange={(e) =>
                    setMatchForm((p) => ({
                      ...p,
                      weights: { ...p.weights, [key]: Number(e.target.value) },
                    }))
                  }
                  className="flex-1 accent-brand"
                />
                <span className="text-[13px] text-text-muted w-8 text-right">
                  {matchForm.weights[key]}
                </span>
              </div>
            ))}
          </div>

          {matchMessage && (
            <p className="text-[13px] text-green-600 mb-4">{matchMessage}</p>
          )}
          {matchError && (
            <p className="text-[13px] text-red-600 mb-4">{matchError}</p>
          )}

          <button
            type="submit"
            disabled={savingMatch}
            className="bg-brand text-white text-[15px] font-semibold px-6 py-2.5 rounded-full hover:bg-brand-dark transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            {savingMatch ? "Saving..." : "Save Match Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}
