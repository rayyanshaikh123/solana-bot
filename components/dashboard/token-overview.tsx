"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/ui/chart"
import { Tooltip } from "recharts"

interface TokenOverviewProps {
  className?: string
}

export function TokenOverview({ className }: TokenOverviewProps) {
  // Sample data for the chart
  const data = [
    { date: "2023-01", value: 1000 },
    { date: "2023-02", value: 1200 },
    { date: "2023-03", value: 900 },
    { date: "2023-04", value: 1500 },
    { date: "2023-05", value: 2000 },
    { date: "2023-06", value: 1800 },
    { date: "2023-07", value: 2200 },
    { date: "2023-08", value: 2600 },
    { date: "2023-09", value: 2400 },
    { date: "2023-10", value: 2800 },
    { date: "2023-11", value: 3200 },
    { date: "2023-12", value: 3600 },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Token Overview</CardTitle>
        <CardDescription>Your token portfolio performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <LineChart
            data={data}
            xAxisKey="date"
            series={[
              {
                key: "value",
                label: "Token Value",
                color: "hsl(var(--primary))",
              },
            ]}
            tooltip={
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, "Value"]}
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

