"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip } from "recharts"

export function MarketOverview() {
  // Sample data for the chart
  const dailyData = [
    { date: "2023-12-01", value: 120 },
    { date: "2023-12-02", value: 125 },
    { date: "2023-12-03", value: 130 },
    { date: "2023-12-04", value: 128 },
    { date: "2023-12-05", value: 135 },
    { date: "2023-12-06", value: 140 },
    { date: "2023-12-07", value: 138 },
    { date: "2023-12-08", value: 142 },
    { date: "2023-12-09", value: 145 },
    { date: "2023-12-10", value: 150 },
    { date: "2023-12-11", value: 148 },
    { date: "2023-12-12", value: 155 },
    { date: "2023-12-13", value: 160 },
    { date: "2023-12-14", value: 158 },
  ]

  const weeklyData = [
    { date: "2023-10-01", value: 100 },
    { date: "2023-10-08", value: 110 },
    { date: "2023-10-15", value: 105 },
    { date: "2023-10-22", value: 120 },
    { date: "2023-10-29", value: 125 },
    { date: "2023-11-05", value: 130 },
    { date: "2023-11-12", value: 135 },
    { date: "2023-11-19", value: 140 },
    { date: "2023-11-26", value: 145 },
    { date: "2023-12-03", value: 150 },
    { date: "2023-12-10", value: 160 },
  ]

  const monthlyData = [
    { date: "2023-01", value: 80 },
    { date: "2023-02", value: 85 },
    { date: "2023-03", value: 90 },
    { date: "2023-04", value: 95 },
    { date: "2023-05", value: 100 },
    { date: "2023-06", value: 110 },
    { date: "2023-07", value: 120 },
    { date: "2023-08", value: 130 },
    { date: "2023-09", value: 140 },
    { date: "2023-10", value: 150 },
    { date: "2023-11", value: 155 },
    { date: "2023-12", value: 160 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solana Market Overview</CardTitle>
        <CardDescription>SOL price performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="h-[300px]">
            <AreaChart
              data={dailyData}
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
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "SOL Price"]}
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
              data={weeklyData}
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
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "SOL Price"]}
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
              data={monthlyData}
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
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "SOL Price"]}
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

