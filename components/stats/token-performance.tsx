"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Tooltip } from "recharts"

export function TokenPerformance() {
  const [timeframe, setTimeframe] = useState("7d")

  // Sample data for the chart
  const performanceData = {
    "7d": [
      { token: "SOL", value: 12.5 },
      { token: "BONK", value: 25.3 },
      { token: "JTO", value: 8.7 },
      { token: "PYTH", value: 15.2 },
      { token: "RAY", value: -5.8 },
      { token: "ORCA", value: 3.2 },
      { token: "MSOL", value: 10.1 },
      { token: "SAMO", value: 18.9 },
    ],
    "30d": [
      { token: "SOL", value: 45.2 },
      { token: "BONK", value: 120.5 },
      { token: "JTO", value: 22.3 },
      { token: "PYTH", value: 38.7 },
      { token: "RAY", value: -12.4 },
      { token: "ORCA", value: 15.8 },
      { token: "MSOL", value: 42.3 },
      { token: "SAMO", value: 65.1 },
    ],
    "90d": [
      { token: "SOL", value: 120.8 },
      { token: "BONK", value: 250.3 },
      { token: "JTO", value: 45.6 },
      { token: "PYTH", value: 85.2 },
      { token: "RAY", value: 12.5 },
      { token: "ORCA", value: 35.7 },
      { token: "MSOL", value: 110.2 },
      { token: "SAMO", value: 180.5 },
    ],
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Token Performance</CardTitle>
          <CardDescription>Performance comparison of top Solana tokens</CardDescription>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
            <SelectItem value="90d">90 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <BarChart
            data={performanceData[timeframe as keyof typeof performanceData]}
            xAxisKey="token"
            series={[
              {
                key: "value",
                label: "% Change",
                valueFormatter: (value) => `${value.toFixed(2)}%`,
                color: "hsl(var(--primary))"
              },
            ]}
            tooltip={
              <Tooltip
                formatter={(value) => [`${Number(value).toFixed(2)}%`, "Change"]}
              />
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}

