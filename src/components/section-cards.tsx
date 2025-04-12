import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  {
    description: "$2.65T",
    title: "Market Cap",
  },
  {
    description: "$75.90B",
    title: "Exchange Volume",
  },
  {
    description: "2,340",
    title: "Assets",
  },
  {
    description: "80",
    title: "Exchanges",
  },
  {
    description: "9,355",
    title: "Markets",
  },
  {
    description: "62.3%",
    title: "BTC DOM Index",
  },
];

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-6">
      {data.length != 0 &&
        data.map((item, index) => (
          <Card key={index} className="@container/card">
            <CardHeader>
              <CardDescription className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {item.description}
              </CardDescription>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}
