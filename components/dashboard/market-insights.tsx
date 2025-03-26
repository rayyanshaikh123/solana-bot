import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MarketInsights() {
  const insights = [
    {
      title: "SOL Price",
      value: "$142.87",
      change: "+5.2%",
      positive: true,
    },
    {
      title: "Market Cap",
      value: "$61.2B",
      change: "+3.8%",
      positive: true,
    },
    {
      title: "24h Volume",
      value: "$2.1B",
      change: "-2.1%",
      positive: false,
    },
    {
      title: "TVL in DeFi",
      value: "$1.8B",
      change: "+7.3%",
      positive: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Insights</CardTitle>
        <CardDescription>Current Solana ecosystem metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.title} className="flex items-center justify-between">
              <div className="text-sm font-medium">{insight.title}</div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{insight.value}</span>
                <Badge variant={insight.positive ? "default" : "destructive"} className="text-xs">
                  {insight.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

