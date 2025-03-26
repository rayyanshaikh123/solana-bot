"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketOverview } from "@/components/stats/market-overview"
import { TokenPerformance } from "@/components/stats/token-performance"
import { TrendingTokens } from "@/components/stats/trending-tokens"
import { AIInsights } from "@/components/stats/ai-insights"
import { Skeleton } from "@/components/ui/skeleton"

export default function StatsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardShell>
      <DashboardHeader heading="Market Stats" text="Real-time Solana market insights and analytics." />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="performance">Token Performance</TabsTrigger>
          <TabsTrigger value="trending">Trending Tokens</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-4">
          <TabsContent value="overview" className="space-y-4">
            {isLoading ? (
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[300px] w-full" />
                </CardContent>
              </Card>
            ) : (
              <MarketOverview />
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            {isLoading ? (
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[300px] w-full" />
                </CardContent>
              </Card>
            ) : (
              <TokenPerformance />
            )}
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            {isLoading ? (
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <TrendingTokens />
            )}
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-4">
            {isLoading ? (
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[300px] w-full" />
                </CardContent>
              </Card>
            ) : (
              <AIInsights />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </DashboardShell>
  )
}

