import { create } from "zustand";
import { CryptoInfo } from "@/types/crypto-info";
import { getRecentlyViewed, addRecentlyViewed } from "@/lib/recently-viewed";

type RecentlyViewedState = {
  recentlyViewed: CryptoInfo[];
  addItem: (item: CryptoInfo) => void;
  refresh: () => void;
};

export const useRecentlyViewedStore = create<RecentlyViewedState>((set) => ({
  recentlyViewed: getRecentlyViewed(),

  addItem: (item: CryptoInfo) => {
    const updated = addRecentlyViewed(item);
    set({ recentlyViewed: updated });
  },

  refresh: () => {
    set({ recentlyViewed: getRecentlyViewed() });
  },
}));
