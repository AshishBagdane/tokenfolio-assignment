import { API_CONFIG } from "@/config/api.config";
import { CryptoInfo } from "@/types/crypto-info";

const STORAGE_KEY = "recently_viewed";

export function getRecentlyViewed(): CryptoInfo[] {
  if (!isBrowser()) return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addRecentlyViewed(
  item: CryptoInfo,
  maxItems = API_CONFIG.MAX_RECENTLY_VIEWED
): CryptoInfo[] {
  if (!isBrowser()) return [];

  const existing = getRecentlyViewed();

  const filtered = existing.filter((i) => i.id !== item.id);

  const updated = [item, ...filtered].slice(0, maxItems);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
}

export function clearRecentlyViewed() {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
}

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

setTimeout(() => {
  clearRecentlyViewed();
}, API_CONFIG.CACHE_TTL);
