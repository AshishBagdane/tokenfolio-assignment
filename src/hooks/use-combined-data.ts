import { API_CONFIG } from "@/config/api.config";
import { fetchMarketTotal, getMarketData } from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";

export function useCombinedData() {
  return useQuery({
    queryKey: ["combinedData"],
    queryFn: async () => {
      const [cryptos, marketTotal] = await Promise.all([
        getMarketData(),
        fetchMarketTotal(),
      ]);

      return { cryptos, marketTotal };
    },
    staleTime: API_CONFIG.CACHE_TTL,
  });
}
