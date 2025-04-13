import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function PriceDisplay({
  amount,
  currency,
  locale,
  notation = "compact",
}: {
  amount: number;
  currency: string;
  locale: string;
  notation?: "standard" | "scientific" | "engineering" | "compact" | undefined;
}) {
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: notation,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formattedPrice;
}

export function formatNumber({
  value,
  locale = "en-US",
  notation = "compact",
  compactDisplay = "short",
}: {
  value: number;
  locale?: string;
  notation?: "standard" | "scientific" | "engineering" | "compact" | undefined;
  compactDisplay?: "long" | "short";
}) {
  return new Intl.NumberFormat(locale, {
    notation: notation,
    compactDisplay: compactDisplay,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(value: number, fractionDigits = 2) {
  return `${Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  })}%`;
}
