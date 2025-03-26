"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip } from "recharts"
import { getHistoricalPriceData, PriceDataPoint } from "@/lib/market-data-service"
import { Skeleton } from "@/components/ui/skeleton"

export function MarketOverview() {
  const [loading, setLoading] = useState(true)
  const [priceData, setPriceData] = useState<{
    daily: PriceDataPoint[],
    weekly: PriceDataPoint[],
    monthly: PriceDataPoint[]
  }>({
    daily: [],
    weekly: [],
    monthly: []
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await getHistoricalPriceData()
        setPriceData(data)
      } catch (error) {
        console.error("Failed to fetch historical price data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solana Market Overview</CardTitle>
        <CardDescription>SOL price performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <Skeleton className="h-[280px] w-full" />
          </div>
        ) : (
          <Tabs defaultValue="daily">
            <TabsList className="mb-4">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="h-[300px]">
              <AreaChart
                data={priceData.daily}
                xAxisKey="date"
                series={[
                  {
                    key: "value",
                    label: "SOL Price",
                    color: "hsl(var(--primary))",
                    area: true,
                  },
                ]}
                tooltip={
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toFixed(2)}`, "SOL Price"]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return `${date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}`;
                    }}
                  />
                }
              />
            </TabsContent>

            <TabsContent value="weekly" className="h-[300px]">
              <AreaChart
                data={priceData.weekly}
                xAxisKey="date"
                series={[
                  {
                    key: "value",
                    label: "SOL Price",
                    color: "hsl(var(--primary))",
                    area: true,
                  },
                ]}
                tooltip={
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toFixed(2)}`, "SOL Price"]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return `${date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}`;
                    }}
                  />
                }
              />
            </TabsContent>

            <TabsContent value="monthly" className="h-[300px]">
              <AreaChart
                data={priceData.monthly}
                xAxisKey="date"
                series={[
                  {
                    key: "value",
                    label: "SOL Price",
                    color: "hsl(var(--primary))",
                    area: true,
                  },
                ]}
                tooltip={
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toFixed(2)}`, "SOL Price"]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return `${date.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}`;
                    }}
                  />
                }
              />
            </TabsContent>
          </Tabs>
        )}

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Current Price</div>
            <div className="text-2xl font-bold">$158.42</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">24h Change</div>
            <div className="text-2xl font-bold text-green-500">+5.2%</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">7d Change</div>
            <div className="text-2xl font-bold text-green-500">+12.8%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

