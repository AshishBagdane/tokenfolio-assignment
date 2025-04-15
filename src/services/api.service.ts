import axios from "axios";
import { API_CONFIG } from "@/config/api.config";
import { CryptoInfo, MarketInfo } from "@/types/crypto-info";

const apiClient = axios.create({
  baseURL: API_CONFIG.COINCAP_BASE_URL,
  params: {
    apiKey: process.env.NEXT_PUBLIC_COINCAP_API_KEY,
  },
});

export async function getMarketData(): Promise<CryptoInfo[]> {
  try {
    const response = await apiClient.get<{ data: CryptoInfo[] }>("assets", {
      params: {
        apiKey: process.env.NEXT_PUBLIC_COINCAP_API_KEY,
        limit: API_CONFIG.RECORDS_FETCH_LIMIT,
      },
    });
    return response.data.data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
    throw error;
  }
}

export async function fetchExchangeRate(toCurrency: string): Promise<number> {
  try {
    if (toCurrency.toLowerCase() === "usd") return 1;

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/USD`
    );

    return response.data.conversion_rates[toCurrency.toUpperCase()];
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
    throw error;
  }
}

type MarketTotal = {
  marketCapUsd: number;
  exchangeVolumeUsd24Hr: number;
  assets: number;
  exchanges: number;
  markets: number;
};

export async function fetchMarketTotal() {
  try {
    const response = await axios.post(
      "https://graphql.coincap.io/",
      {
        variables: {},
        query: `
        {
          marketTotal {
            marketCapUsd
            exchangeVolumeUsd24Hr
            assets
            exchanges
            markets
            __typename
          }
        }
      `,
      },
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,hi;q=0.8,mr;q=0.7",
          "content-type": "application/json",
        },
      }
    );

    const data = response.data.data.marketTotal;

    const marketTotal: MarketTotal = {
      marketCapUsd: parseFloat(data.marketCapUsd),
      exchangeVolumeUsd24Hr: parseFloat(data.exchangeVolumeUsd24Hr),
      assets: data.assets,
      exchanges: data.exchanges,
      markets: data.markets,
    };

    return marketTotal;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching market total:", error);
    }
    throw error;
  }
}

export async function latestMarketData(
  slug: string,
  limit?: number
): Promise<MarketInfo[]> {
  try {
    const response = await apiClient.get<{ data: MarketInfo[] }>(
      `assets/${slug}/markets`,
      {
        params: {
          apiKey: process.env.NEXT_PUBLIC_COINCAP_API_KEY,
          limit: limit || API_CONFIG.MARKET_DATA_LIMIT,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`Error fetching market for ${slug}: `, error);
    }
    throw error;
  }
}
