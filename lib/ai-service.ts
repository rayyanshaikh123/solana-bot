import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface AIInsight {
  title: string
  content: string
  timestamp: string
}

export async function generateMarketInsights(): Promise<AIInsight[]> {
  try {
    // Check if we have the OpenAI API key
    const hasOpenAIKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY

    if (hasOpenAIKey) {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Generate three insightful analyses about the current Solana ecosystem and token market. 
        Include: 
        1. A price prediction for SOL based on current trends
        2. A market sentiment analysis
        3. Emerging token opportunities
        
        Format each insight with a title and detailed content paragraph.`,
      })

      // Parse the response into structured insights
      const insights = parseInsightsFromText(text)

      return insights.map((insight) => ({
        ...insight,
        timestamp: "Generated just now",
      }))
    } else {
      // Return mock insights if no API key is available
      return getMockInsights()
    }
  } catch (error) {
    console.error("Error generating AI insights:", error)

    // Return fallback insights
    return getMockInsights()
  }
}

// Helper function to parse AI-generated text into structured insights
function parseInsightsFromText(text: string): Omit<AIInsight, "timestamp">[] {
  // This is a simplified parser - in a real app, you'd want more robust parsing
  const sections = text.split(/\n\s*\n/)

  return sections
    .map((section) => {
      const lines = section.trim().split("\n")
      const title = lines[0]
        .replace(/^\d+\.\s*/, "")
        .replace(/[:#]/, "")
        .trim()
      const content = lines.slice(1).join(" ").trim()

      return { title, content }
    })
    .filter((insight) => insight.title && insight.content)
}

// Mock insights for when API is not available
function getMockInsights(): AIInsight[] {
  return [
    {
      title: "SOL Price Prediction",
      content:
        "Based on current market trends and on-chain activity, SOL is likely to continue its upward momentum in the short term. Technical indicators suggest a potential resistance level at $175.",
      timestamp: "Generated 2 hours ago (mock data)",
    },
    {
      title: "Market Sentiment Analysis",
      content:
        "Social media sentiment for Solana ecosystem tokens is overwhelmingly positive (78%) over the past 24 hours, with increased discussion around DeFi applications and NFT projects.",
      timestamp: "Generated 2 hours ago (mock data)",
    },
    {
      title: "Emerging Token Opportunities",
      content:
        "Several new Solana tokens are showing promising growth patterns. BONK continues to gain traction with increased utility across the ecosystem. JTO and PYTH are demonstrating strong fundamentals.",
      timestamp: "Generated 2 hours ago (mock data)",
    },
  ]
}

