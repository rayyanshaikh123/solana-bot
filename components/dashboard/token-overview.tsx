"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/ui/chart"
import { Tooltip } from "recharts"
import { getHistoricalPriceData, PriceDataPoint } from "@/lib/market-data-service"
import { Skeleton } from "@/components/ui/skeleton"

interface TokenOverviewProps {
  className?: string
}

export function TokenOverview({ className }: TokenOverviewProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<PriceDataPoint[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const { monthly } = await getHistoricalPriceData()
        // Scale for portfolio value (10x SOL price for demonstration)
        setData(monthly.map(point => ({
          ...point,
          value: point.value * 10 * (1 + Math.random() * 0.4)
        })))
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Token Overview</CardTitle>
        <CardDescription>Your token portfolio performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <Skeleton className="h-[280px] w-full" />
          </div>
        ) : (
          <div className="h-[300px]">
            <LineChart
              data={data}
              xAxisKey="date"
              series={[
                {
                  key: "value",
                  label: "Portfolio Value",
                  color: "hsl(var(--primary))",
                },
              ]}
              tooltip={
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, "Value"]}
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
          </div>
        )}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Total Value</div>
            <div className="text-2xl font-bold">$3,600</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-sm font-medium text-muted-foreground">Growth (YTD)</div>
            <div className="text-2xl font-bold text-green-500">+260%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

