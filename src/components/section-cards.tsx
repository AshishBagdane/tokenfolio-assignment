"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber, PriceDisplay } from "@/lib/utils";
import { fetchMarketTotal } from "@/services/api.service";
import { useEffect, useState } from "react";

interface CardData {
  title: string;
  data: number;
  isFractional?: boolean;
}

export function SectionCards() {
  const [cards, setCards] = useState(() => {
    const arr: CardData[] = [];
    return arr;
  });

  useEffect(() => {
    fetchMarketTotal()
      .then((marketTotal) => {
        const arr: CardData[] = [];
        arr.push({
          title: "Market Cap",
          data: marketTotal.marketCapUsd,
          isFractional: true,
        });
        arr.push({
          title: "Exchange Volume",
          data: marketTotal.exchangeVolumeUsd24Hr,
          isFractional: true,
        });
        arr.push({
          title: "Assets",
          data: marketTotal.assets,
          isFractional: false,
        });
        arr.push({
          title: "Exchanges",
          data: marketTotal.exchanges,
          isFractional: false,
        });
        arr.push({
          title: "Markets",
          data: marketTotal.markets,
          isFractional: false,
        });
        setCards(arr);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      {cards.length != 0 &&
        cards.map((item, index) => (
          <Card key={index} className="@container/card">
            <CardHeader className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <CardDescription className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {!item.isFractional && (
                  <>{formatNumber({ value: item.data })}</>
                )}
                {item.isFractional && (
                  <PriceDisplay
                    amount={item.data}
                    currency="USD"
                    locale="en-US"
                  />
                )}
              </CardDescription>
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}
