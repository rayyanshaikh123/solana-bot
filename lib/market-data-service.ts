import { createSolanaAgentKit } from "./solana-agent-kit";
import dotenv from "dotenv";
import Together from "together-ai";
 
dotenv.config(); // Load environment variables if needed
 
// Hardcoded API Key (if you need it, pass it in the options)
const TOGETHER_API_KEY: string = "0bf2f98a6e7769143bb880306b568aeb2439a3407ed6f2c222df030fb6e62250";
 
// Instantiate Together with the hardcoded API key
const together = new Together({
  apiKey: TOGETHER_API_KEY,
});
 
export interface PriceDataPoint {
  date: string;
  value: number;
}
 
export interface TokenPerformanceData {
  token: string;
  value: number;
}
 
export interface MarketInsight {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}
 
export async function getMarketInsights(): Promise<MarketInsight[]> {
  try {
    console.log("🤖 Fetching market insights from Together AI...");
 
    const prompt = `Generate current Solana market insights in JSON format. Include:
    1. SOL Price with 24h change
    2. Market Cap with 24h change
    3. 24h Volume with 24h change
    4. TVL in DeFi with 24h change
 
    Format the response as a JSON array of objects with properties:
    - title: string
    - value: string (formatted with $ and B/M for billions/millions)
    - change: string (percentage with + or -)
    - positive: boolean`;
 
    // Call the chat-based API using the messages array
    const response = await together.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });
 
    // Extract the AI response text
    const responseText = response.choices?.[0]?.message?.content?.trim() || "";
    console.log("📥 AI Response:", responseText);
 
    // Extract JSON from the response text
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("❌ No JSON found in AI response");
    }
 
    const insights: MarketInsight[] = JSON.parse(jsonMatch[0]);
    console.log("✅ Parsed market insights:", insights);
 
    return insights;
  } catch (error) {
    console.error("❌ Error fetching market insights:", error);
 
    // Fallback to local data
    const solanaKit = createSolanaAgentKit();
    const stats = await solanaKit.getMarketStats();
 
    return [
      {
        title: "SOL Price",
        value: `$${stats.solPrice.toFixed(2)}`,
        change: "0.00%",
        positive: true,
      },
      {
        title: "Market Cap",
        value: `$${(stats.marketCap / 1e9).toFixed(1)}B`,
        change: "0.00%",
        positive: true,
      },
      {
        title: "24h Volume",
        value: `$${(stats.volume24h / 1e9).toFixed(1)}B`,
        change: "0.00%",
        positive: true,
      },
      {
        title: "TVL in DeFi",
        value: `$${(stats.tvl / 1e9).toFixed(1)}B`,
        change: "0.00%",
        positive: true,
      },
    ];
  }
}
 
export async function getHistoricalPriceData(): Promise<{
  daily: PriceDataPoint[];
  weekly: PriceDataPoint[];
  monthly: PriceDataPoint[];
}> {
  try {
    const solanaKit = createSolanaAgentKit();
    const { solPrice } = await solanaKit.getMarketStats();
 
    return {
      daily: generateHistoricalData(14, solPrice, "daily"),
      weekly: generateHistoricalData(11, solPrice, "weekly"),
      monthly: generateHistoricalData(12, solPrice, "monthly"),
    };
  } catch (error) {
    console.error("❌ Error generating historical price data:", error);
    throw error;
  }
}
 
export async function getTokenPerformanceData(): Promise<{
  "7d": TokenPerformanceData[];
  "30d": TokenPerformanceData[];
  "90d": TokenPerformanceData[];
}> {
  try {
    const tokens = ["SOL", "BONK", "JTO", "PYTH", "RAY", "ORCA", "MSOL", "SAMO"];
 
    const generate = (range: number) =>
      tokens.map((token) => ({
        token,
        value: Math.random() * range * 2 - range * 0.3,
      }));
 
    return {
      "7d": generate(25),
      "30d": generate(50),
      "90d": generate(100),
    };
  } catch (error) {
    console.error("❌ Error fetching token performance data:", error);
    throw error;
  }
}
 
// Helper function to generate realistic historical price data
function generateHistoricalData(
  count: number,
  currentPrice: number,
  timeframe: "daily" | "weekly" | "monthly"
): PriceDataPoint[] {
  const result: PriceDataPoint[] = [];
  const now = new Date();
 
  const volatility = timeframe === "daily" ? 0.03 : timeframe === "weekly" ? 0.08 : 0.15;
  const upwardTrend = -0.4;
 
  let price = currentPrice * (1 - Math.random() * 0.3 - count * volatility * upwardTrend);
 
  for (let i = 0; i < count; i++) {
    const date = new Date(now);
 
    if (timeframe === "daily") {
      date.setDate(date.getDate() - (count - i - 1));
    } else if (timeframe === "weekly") {
      date.setDate(date.getDate() - (count - i - 1) * 7);
    } else {
      date.setMonth(date.getMonth() - (count - i - 1));
    }
 
    result.push({
      date:
        timeframe === "monthly"
          ? date.toISOString().split("T")[0].substring(0, 7)
          : date.toISOString().split("T")[0],
      value: price,
    });
 
    const randomFactor = Math.random() * volatility * 2 - volatility;
    const trendFactor = (i / count) * volatility * upwardTrend;
    price = price * (1 + randomFactor + trendFactor);
  }
 
  if (result.length > 0) {
    result[result.length - 1].value = currentPrice * (0.98 + Math.random() * 0.04);
  }
 
  return result;
}