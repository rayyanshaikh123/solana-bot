import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function TrendingTokens() {
  const trendingTokens = [
    {
      name: "Solana",
      symbol: "SOL",
      price: "$158.42",
      change: "+5.2%",
      volume: "$2.1B",
      positive: true,
      icon: "SOL",
    },
    {
      name: "Bonk",
      symbol: "BONK",
      price: "$0.00002145",
      change: "+12.8%",
      volume: "$450M",
      positive: true,
      icon: "BONK",
    },
    {
      name: "Jito",
      symbol: "JTO",
      price: "$3.85",
      change: "+3.2%",
      volume: "$120M",
      positive: true,
      icon: "JTO",
    },
    {
      name: "Pyth Network",
      symbol: "PYTH",
      price: "$0.48",
      change: "-2.1%",
      volume: "$85M",
      positive: false,
      icon: "PYTH",
    },
    {
      name: "Raydium",
      symbol: "RAY",
      price: "$0.95",
      change: "+1.5%",
      volume: "$65M",
      positive: true,
      icon: "RAY",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Tokens</CardTitle>
        <CardDescription>Most popular Solana tokens in the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingTokens.map((token) => (
            <div key={token.symbol} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={token.name} />
                  <AvatarFallback>{token.icon}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-muted-foreground">{token.symbol}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-medium">{token.price}</div>
                <div className="flex items-center gap-1">
                  <Badge variant={token.positive ? "default" : "destructive"} className="text-xs">
                    {token.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{token.volume}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

