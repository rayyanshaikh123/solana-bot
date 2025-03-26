// Unified command structure for both Discord and Telegram bots

export interface CommandContext {
  platform: "discord" | "telegram"
  userId: string
  username: string
  channelId?: string
  guildId?: string // Discord only
  chatId?: number // Telegram only
}

export interface CommandResponse {
  text: string
  embeds?: any[] // For Discord rich embeds
  components?: any[] // For Discord buttons/selects
}

export interface Command {
  name: string
  description: string
  execute: (args: string[], context: CommandContext) => Promise<CommandResponse>
}

// Import the Solana Agent Kit
import { createSolanaAgentKit } from "../solana-agent-kit"

// Create command handlers
export const commands: Record<string, Command> = {
  create: {
    name: "create",
    description: "Initiates a Solana token project",
    execute: async (_args: string[], context: CommandContext) => {
      // This would typically start an interactive flow
      return {
        text: `👋 Hi ${context.username}! Let's create a new Solana token. Please provide the following information:

1. Token Name
2. Token Symbol
3. Initial Supply
4. Decimals (0-9)

Example: \`MyToken MTK 1000000 9\``,
      }
    },
  },

  stats: {
    name: "stats",
    description: "Retrieves real-time Solana market insights",
    execute: async (_args: string[], _context: CommandContext) => {
      try {
        const solanaKit = createSolanaAgentKit()
        const stats = await solanaKit.getMarketStats()

        return {
          text: `📊 **Solana Market Stats**

• SOL Price: $${stats.solPrice.toFixed(2)}
• Market Cap: $${(stats.marketCap / 1e9).toFixed(2)}B
• 24h Volume: $${(stats.volume24h / 1e9).toFixed(2)}B
• TVL in DeFi: $${(stats.tvl / 1e9).toFixed(2)}B

_Data refreshed at ${new Date().toLocaleTimeString()}_`,
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
        return {
          text: "❌ Error fetching Solana market stats. Please try again later.",
        }
      }
    },
  },

  help: {
    name: "help",
    description: "Provides assistance and usage guidance",
    execute: async (_args: string[], _context: CommandContext) => {
      return {
        text: `🤖 **Solana DeFi Token Assistant Help**

Available commands:

• \`/create\` - Create a new Solana token
• \`/stats\` - Get real-time Solana market insights
• \`/help\` - Show this help message

For more detailed information, visit our documentation at https://docs.solanatokenassistant.com`,
      }
    },
  },
}

// Function to handle commands from any platform
export async function handleCommand(
  commandName: string,
  args: string[],
  context: CommandContext,
): Promise<CommandResponse> {
  const command = commands[commandName]

  if (!command) {
    return {
      text: `❌ Unknown command: ${commandName}. Type \`/help\` to see available commands.`,
    }
  }

  try {
    return await command.execute(args, context)
  } catch (error) {
    console.error(`Error executing command ${commandName}:`, error)
    return {
      text: "❌ An error occurred while processing your command. Please try again later.",
    }
  }
}

