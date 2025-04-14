import { API_CONFIG } from "@/config/api.config";
import { CryptoInfo } from "@/types/crypto-info";

const STORAGE_KEY = "recently_viewed";

type CachedCryptoInfo = CryptoInfo & { timestamp: number };

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function getRecentlyViewed(): CryptoInfo[] {
  if (!isBrowser()) return [];

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  const items: CachedCryptoInfo[] = JSON.parse(data);

  const now = Date.now();
  const validItems = items.filter(
    (item) => now - item.timestamp <= API_CONFIG.CACHE_TTL
  );

  if (validItems.length !== items.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validItems));
  }

  // Return clean items without the timestamp
  return validItems.map(({ timestamp, ...rest }) => rest);
}

export function addRecentlyViewed(
  item: CryptoInfo,
  maxItems = API_CONFIG.MAX_RECENTLY_VIEWED
): CryptoInfo[] {
  if (!isBrowser()) return [];

  const data = localStorage.getItem(STORAGE_KEY);
  const existing: CachedCryptoInfo[] = data ? JSON.parse(data) : [];

  const filtered = existing.filter((i) => i.id !== item.id);

  const timestampedItem: CachedCryptoInfo = { ...item, timestamp: Date.now() };

  const updated: CachedCryptoInfo[] = [timestampedItem, ...filtered].slice(
    0,
    maxItems
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated.map(({ timestamp, ...rest }) => rest);
}

export function clearRecentlyViewed() {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
}
