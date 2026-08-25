const API_URL = "https://nex-key-production.up.railway.app/api";

async function getAuthHeaders() {
  const { auth } = await import("../config/firebase");
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function getOptionalAuthHeaders() {
  const { auth } = await import("../config/firebase");
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
  const res = await fetch(`${API_URL}/auth/sync`, { method: "POST", headers });
  if (!res.ok) throw new Error("Failed to sync user");
  return res.json();
}

export async function getDeals(filters = {}) {
  const headers = await getOptionalAuthHeaders();
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.dealType && filters.dealType !== "All Deals") params.set("dealType", filters.dealType);
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
  if (filters.monthlyMax && filters.monthlyMax < 5000) params.set("monthlyMax", filters.monthlyMax);

  if (filters.exitStrategies && filters.exitStrategies.length > 0) {
    filters.exitStrategies.forEach((s) => params.append("exitStrategies[]", s));
  }

  const queryString = params.toString();
  const url = queryString ? `${API_URL}/deals?${queryString}` : `${API_URL}/deals`;

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error("Failed to fetch deals");
  return res.json();
}

export async function getDealById(id) {
  const headers = await getOptionalAuthHeaders();
  const res = await fetch(`${API_URL}/deals/${id}`, { headers });
  if (!res.ok) throw new Error("Failed to fetch deal");
  return res.json();
}