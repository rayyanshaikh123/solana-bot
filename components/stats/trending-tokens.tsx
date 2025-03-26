"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import Together from "together-ai"
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react"

interface TrendingToken {
  name: string
  symbol: string
  price: string
  change: string
  isPositive: boolean
}

export function TrendingTokens() {
  const [loading, setLoading] = useState(true)
  const [tokens, setTokens] = useState<TrendingToken[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTrendingTokens() {
      try {
        setLoading(true)
        setError(null)
        
        const hasTogetherKey = process.env.NEXT_PUBLIC_TOGETHER_API_KEY
        
        let generatedTokens: TrendingToken[];
        
        if (hasTogetherKey) {
          // Use Together AI to generate trending tokens
          const together = new Together(hasTogetherKey)
          
          const prompt = `
          Generate a list of 5 trending Solana tokens with realistic market data. 
          Format as JSON array with objects containing:
          - name: Full token name
          - symbol: Token symbol
          - price: Current price as string with $ sign
          - change: 24h percentage change as string with % sign
          - isPositive: Boolean indicating if change is positive
          
          Make the data realistic with varied percentage changes.
          `
          
          const response = await together.complete({
            prompt,
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            max_tokens: 800,
            temperature: 0.7,
            format: "json"
          })
          
          try {
            // Try to parse the JSON response
            const text = response.output.choices[0].text
            // Find the JSON array in the response
            const jsonMatch = text.match(/\[[\s\S]*\]/)
            if (jsonMatch) {
              generatedTokens = JSON.parse(jsonMatch[0])
            } else {
              throw new Error("Invalid response format")
            }
          } catch (parseError) {
            console.error("Failed to parse AI response:", parseError)
            throw new Error("Failed to parse trending tokens data")
          }
        } else {
          // Use mock data if no API key
          generatedTokens = [
            {
              name: "Solana",
              symbol: "SOL",
              price: "$142.87",
              change: "+5.2%",
              isPositive: true
            },
            {
              name: "Bonk",
              symbol: "BONK",
              price: "$0.000028",
              change: "+12.7%",
              isPositive: true
            },
            {
              name: "Jupiter",
              symbol: "JUP",
              price: "$1.35",
              change: "-3.5%",
              isPositive: false
            },
            {
              name: "Marinade Staked SOL",
              symbol: "MSOL",
              price: "$150.48",
              change: "+4.8%",
              isPositive: true
            },
            {
              name: "Raydium",
              symbol: "RAY",
              price: "$2.65",
              change: "-1.2%",
              isPositive: false
            }
          ]
        }
        
        setTokens(generatedTokens)
      } catch (err) {
        console.error("Error fetching trending tokens:", err)
        setError("Failed to fetch trending tokens. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingTokens()
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Trending Tokens</CardTitle>
        </div>
        <CardDescription>Top Solana tokens by 24h activity</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-14" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-3 w-12 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {tokens.map((token, index) => (
              <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {token.symbol.substring(0, 2)}
                  </div>
                  <div>
                    <div className="font-medium">{token.name}</div>
                    <div className="text-xs text-muted-foreground">{token.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{token.price}</div>
                  <div className="flex items-center gap-1 justify-end">
                    {token.isPositive ? (
                      <ArrowUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={token.isPositive ? "text-xs text-green-500" : "text-xs text-red-500"}>
                      {token.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

