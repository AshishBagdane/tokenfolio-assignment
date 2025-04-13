export interface CryptoInfo {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string | null;
  maxSupply: string | null;
  marketCapUsd: string | null;
  volumeUsd24Hr: string | null;
  priceUsd: string;
  changePercent24Hr: string | null;
  vwap24Hr: string | null;
  explorer: string | null;
}
