"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Sparkles } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function AIInsights() {
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState([
    {
      title: "SOL Price Prediction",
      content:
        "Based on current market trends and on-chain activity, SOL is likely to continue its upward momentum in the short term. Technical indicators suggest a potential resistance level at $175.",
      timestamp: "Generated 2 hours ago",
    },
    {
      title: "Market Sentiment Analysis",
      content:
        "Social media sentiment for Solana ecosystem tokens is overwhelmingly positive (78%) over the past 24 hours, with increased discussion around DeFi applications and NFT projects.",
      timestamp: "Generated 2 hours ago",
    },
    {
      title: "Emerging Token Opportunities",
      content:
        "Several new Solana tokens are showing promising growth patterns. BONK continues to gain traction with increased utility across the ecosystem. JTO and PYTH are demonstrating strong fundamentals.",
      timestamp: "Generated 2 hours ago",
    },
  ])

  const refreshInsights = () => {
    setLoading(true)

    // Simulate API call to AI service
    setTimeout(() => {
      setInsights([
        {
          title: "SOL Price Prediction",
          content:
            "Recent institutional inflows suggest SOL may test the $180 level in the coming weeks. On-chain metrics show accumulation by large holders, which historically precedes price appreciation.",
          timestamp: "Generated just now",
        },
        {
          title: "Market Sentiment Analysis",
          content:
            "Sentiment has shifted slightly more positive (82%) in the last few hours. Developer activity metrics show Solana maintaining the highest GitHub commit rate among Layer 1 blockchains.",
          timestamp: "Generated just now",
        },
        {
          title: "Emerging Token Opportunities",
          content:
            "New analysis identifies SAMO and ORCA as potentially undervalued based on user growth metrics and protocol revenue. DeFi tokens on Solana are showing increased correlation with SOL price movements.",
          timestamp: "Generated just now",
        },
      ])
      setLoading(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI-Powered Insights</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={refreshInsights} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
        <CardDescription>Market analysis powered by AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              {insights.map((insight, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{insight.content}</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-muted-foreground">{insight.timestamp}</p>
                  </CardFooter>
                </Card>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

