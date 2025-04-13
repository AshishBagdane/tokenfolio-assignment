import axios from "axios";
import { API_CONFIG } from "@/config/api.config";
import { CryptoInfo } from "@/types/crypto-info";

const apiClient = axios.create({
  baseURL: API_CONFIG.COINCAP_BASE_URL,
  params: {
    apiKey: process.env.NEXT_PUBLIC_COINCAP_API_KEY,
  },
});

export async function getMarketData(): Promise<CryptoInfo[]> {
  const response = await apiClient.get<{ data: CryptoInfo[] }>("assets", {
    params: {
      apiKey: process.env.NEXT_PUBLIC_COINCAP_API_KEY,
      limit: API_CONFIG.RECORDS_FETCH_LIMIT,
    },
  });
  return response.data.data;
}

export async function fetchExchangeRate(toCurrency: string): Promise<number> {
  if (toCurrency.toLowerCase() === "usd") return 1;

  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/USD`
  );

  const rate = response.data.conversion_rates[toCurrency.toUpperCase()];
  if (!rate) throw new Error(`No exchange rate found for ${toCurrency}`);

  return rate;
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
    console.error("Error fetching market total:", error);
    throw error;
  }
}
