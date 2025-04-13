import { formatNumber, formatPercentage, PriceDisplay } from "@/lib/utils";
import { CryptoInfo } from "@/types/crypto-info";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CryptoDetails({
  data,
  currency,
  exchangeRate,
}: {
  data: CryptoInfo;
  currency: string;
  exchangeRate: number;
}) {
  return (
    <>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Market Cap</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              <div className="text-right">
                {data.marketCapUsd && (
                  <PriceDisplay
                    amount={parseFloat(data.marketCapUsd) * exchangeRate}
                    currency={currency}
                    locale="en-US"
                    notation="standard"
                  />
                )}
              </div>
            </div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">VWAP (24Hr)</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              <div className="text-right">
                {data.vwap24Hr && (
                  <PriceDisplay
                    amount={parseFloat(data.vwap24Hr) * exchangeRate}
                    currency={currency}
                    locale="en-US"
                    notation="standard"
                  />
                )}
              </div>
            </div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Supply</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              <div className="text-right">
                {data.supply &&
                  formatNumber({
                    value: +data.supply,
                    notation: "standard",
                  })}
              </div>
            </div>
          </dd>
        </div>

        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Volume</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              <div className="text-right">
                {data.volumeUsd24Hr && (
                  <PriceDisplay
                    amount={parseFloat(data.volumeUsd24Hr) * exchangeRate}
                    currency={currency}
                    locale="en-US"
                    notation="standard"
                  />
                )}
              </div>
            </div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Change(24hr)</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              <div className="text-right">
                {data.changePercent24Hr &&
                  formatPercentage(+data.changePercent24Hr)}
              </div>
            </div>
          </dd>
        </div>
      </dl>
    </>
  );
}
