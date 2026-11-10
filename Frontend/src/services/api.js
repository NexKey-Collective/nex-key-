import { auth } from "../config/firebase";
import { request, jsonResponse } from "../utils/http";
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3000/api"
    : "https://nex-key-production.up.railway.app/api");

async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function getOptionalAuthHeaders() {
  const user = auth.currentUser;
  if (!user) return { "Content-Type": "application/json" };
  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function syncUser() {
  const headers = await getAuthHeaders();
  const res = await request(`${API_URL}/auth/sync`, {
    method: "POST",
    headers,
  });
  return jsonResponse(res);
}

// Short-lived client cache for deal list requests, keyed by the resolved
// query string. The deals page re-fetches on every mount (tab switch, back
// button, etc.) with the same filters most of the time — this avoids paying
// the network + JSON parse cost again for an identical request within the
// window, without changing what's shown (results just aren't stale-safe
// past this TTL, matching the backend's own cache window).
const DEALS_CACHE_TTL_MS = 30 * 1000;
const dealsCache = new Map(); // url -> { data, fetchedAt }
const dealsInflight = new Map(); // url -> Promise

export async function getDeals(filters = {}) {
  const headers = await getOptionalAuthHeaders();
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.dealType && filters.dealType !== "All Deals")
    params.set("dealType", filters.dealType);
  if (filters.state) params.set("state", filters.state);
  if (filters.city) params.set("city", filters.city);
  if (filters.minBeds) params.set("minBeds", filters.minBeds);
  if (filters.minBaths) params.set("minBaths", filters.minBaths);
  if (filters.minEntryFee) params.set("minEntryFee", filters.minEntryFee);
  if (filters.maxEntryFee) params.set("maxEntryFee", filters.maxEntryFee);
  if (filters.furnished) params.set("furnished", filters.furnished);
  if (filters.hasPool) params.set("hasPool", filters.hasPool);
  if (filters.multiUnit) params.set("multiUnit", filters.multiUnit);
  if (filters.monthlyMin) params.set("monthlyMin", filters.monthlyMin);
  if (filters.monthlyMax && filters.monthlyMax < 5000)
    params.set("monthlyMax", filters.monthlyMax);

  if (filters.exitStrategies && filters.exitStrategies.length > 0) {
    filters.exitStrategies.forEach((s) => params.append("exitStrategies[]", s));
  }

  const queryString = params.toString();
  const url = queryString
    ? `${API_URL}/deals?${queryString}`
    : `${API_URL}/deals`;

  const cached = dealsCache.get(url);
  if (cached && Date.now() - cached.fetchedAt < DEALS_CACHE_TTL_MS) {
    return cached.data;
  }

  if (dealsInflight.has(url)) {
    return dealsInflight.get(url);
  }

  const pendingRequest = request(url, { headers })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch deals");
      return res.json();
    })
    .then((data) => {
      dealsCache.set(url, { data, fetchedAt: Date.now() });
      dealsInflight.delete(url);
      return data;
    })
    .catch((error) => {
      dealsInflight.delete(url);
      throw error;
    });

  dealsInflight.set(url, pendingRequest);
  return pendingRequest;
}

export async function getDealById(id) {
  const headers = await getOptionalAuthHeaders();
  const res = await request(`${API_URL}/deals/${id}`, { headers });
  return jsonResponse(res);
}

export async function getBuyBox() {
  const headers = await getAuthHeaders();
  const res = await request(`${API_URL}/buyers/buybox`, { headers });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch buy box");
  const data = await res.json();
  return data.buyBox;
}

export async function saveBuyBox(buyBox, exists) {
  const headers = await getAuthHeaders();
  const res = await request(`${API_URL}/buyers/buybox`, {
    method: exists ? "PUT" : "POST",
    headers,
    body: JSON.stringify(buyBox),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to save buy box");
  }
  const data = await res.json();
  return data.buyBox;
}

export async function getMatchSettings() {
  const headers = await getAuthHeaders();
  const res = await request(`${API_URL}/buyers/match-settings`, { headers });
  if (!res.ok) throw new Error("Failed to fetch match settings");
  const data = await res.json();
  return data.settings;
}

export async function saveMatchSettings(settings) {
  const headers = await getAuthHeaders();
  const res = await request(`${API_URL}/buyers/match-settings`, {
    method: "PUT",
    headers,
    body: JSON.stringify(settings),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to save match settings");
  }
  const data = await res.json();
  return data.settings;
}

export async function getMapLocations(signal) {
  const response = await request(`${API_URL}/deals/map-locations`, { signal });
  if (!response.ok)
    throw new Error("Map locations are temporarily unavailable.");
  return response.json();
}

export async function getMatches() {
  return jsonResponse(
    await request(`${API_URL}/matches`, { headers: await getAuthHeaders() }),
  );
}
export async function getMatchScore(id) {
  return jsonResponse(
    await request(`${API_URL}/matches/${encodeURIComponent(id)}`, {
      headers: await getAuthHeaders(),
    }),
  );
}
export async function getFavorites() {
  return jsonResponse(
    await request(`${API_URL}/favorites`, { headers: await getAuthHeaders() }),
  );
}
export async function setFavorite(id, saved) {
  return jsonResponse(
    await request(`${API_URL}/favorites/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: await getAuthHeaders(),
      body: JSON.stringify({ saved }),
    }),
  );
}
