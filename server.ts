import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily to ensure robust start up behavior
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } else {
      console.warn("GEMINI_API_KEY env variable is not set. API calls will return rich fallback mock data.");
    }
  }
  return aiClient;
}

// In-memory detailed data for our coins
interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  rank: number;
  sentiment: "Bullish" | "Bearish" | "Neutral";
  history7d: { day: string; price: number }[];
  description: string;
}

const cryptoMarketData: Record<string, CoinData> = {
  BTC: {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 104250.80,
    change24h: 3.42,
    high24h: 105100.00,
    low24h: 100450.10,
    volume24h: 42150000000,
    marketCap: 2045000000000,
    rank: 1,
    sentiment: "Bullish",
    history7d: [
      { day: "Mon", price: 98100 },
      { day: "Tue", price: 99400 },
      { day: "Wed", price: 101200 },
      { day: "Thu", price: 100100 },
      { day: "Fri", price: 102500 },
      { day: "Sat", price: 103800 },
      { day: "Sun", price: 104250.80 },
    ],
    description: "Bitcoin is the first decentralized digital currency. It uses cryptography to secure and verify transactions, which are recorded on a public distributed ledger called a blockchain."
  },
  ETH: {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3820.45,
    change24h: -1.25,
    high24h: 3910.00,
    low24h: 3780.20,
    volume24h: 18500000000,
    marketCap: 460000000000,
    rank: 2,
    sentiment: "Neutral",
    history7d: [
      { day: "Mon", price: 3950 },
      { day: "Tue", price: 3920 },
      { day: "Wed", price: 3880 },
      { day: "Thu", price: 3810 },
      { day: "Fri", price: 3840 },
      { day: "Sat", price: 3855 },
      { day: "Sun", price: 3820.45 },
    ],
    description: "Ethereum is a community-built technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications (dApps) through smart contract executions."
  },
  SOL: {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 248.60,
    change24h: 12.84,
    high24h: 252.30,
    low24h: 218.40,
    volume24h: 9120000000,
    marketCap: 118000000000,
    rank: 5,
    sentiment: "Bullish",
    history7d: [
      { day: "Mon", price: 202 },
      { day: "Tue", price: 209 },
      { day: "Wed", price: 215 },
      { day: "Thu", price: 211 },
      { day: "Fri", price: 228 },
      { day: "Sat", price: 242 },
      { day: "Sun", price: 248.60 },
    ],
    description: "Solana is a blockchain platform designed to host decentralized, scalable applications. It utilizes a unique consensus mechanism known as Proof of History (PoH) coupled with Proof of Stake."
  },
  ADA: {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 1.15,
    change24h: 0.45,
    high24h: 1.18,
    low24h: 1.11,
    volume24h: 1050000000,
    marketCap: 41000000000,
    rank: 10,
    sentiment: "Neutral",
    history7d: [
      { day: "Mon", price: 1.10 },
      { day: "Tue", price: 1.12 },
      { day: "Wed", price: 1.16 },
      { day: "Thu", price: 1.14 },
      { day: "Fri", price: 1.13 },
      { day: "Sat", price: 1.16 },
      { day: "Sun", price: 1.15 },
    ],
    description: "Cardano is a proof-of-stake blockchain platform that says its goal is to allow changemakers, innovators and visionaries to bring about positive global change."
  }
};

// 1. Get Cryptocurrency Market Data List
app.get("/api/crypto/market-data", (req, res) => {
  res.json({
    success: true,
    data: Object.values(cryptoMarketData)
  });
});

// 2. Get AI Insights for a Specific Coin via Gemini API
app.post("/api/crypto/insights", async (req, res) => {
  const { symbol } = req.body;
  const coin = cryptoMarketData[symbol as string];

  if (!coin) {
    return res.status(404).json({
      success: false,
      message: `Cryptocurrency with symbol ${symbol} not found.`
    });
  }

  const client = getGeminiClient();

  if (!client) {
    // If Gemini client is unavailable (e.g. no API key configured), return high-quality simulated AI analysis
    const simulatedResponse = `### 🚀 ${coin.name} (${coin.symbol}) Simulated Market Analysis

**Current Status:** The price is sitting at **$${coin.price.toLocaleString()}** with a 24-hour shift of **${coin.change24h}%** (Market Cap: **$${(coin.marketCap / 1e9).toFixed(2)}B**). Market sentiment is currently **${coin.sentiment}**.

#### Technical Indicator Highlights:
*   **Support/Resistance:** Crucial local support sits around **$${(coin.price * 0.96).toFixed(2)}**, while a primary resistance level looms at **$${(coin.price * 1.04).toFixed(2)}**.
*   **Momentum Metrics:** The relative strength index is showing healthy recovery bands, matching the **${coin.sentiment}** macro structure.

#### AI Market Prediction & Recommendation:
*   *Medium Term Profile:* Continued consolidation above support lines would establish a firm foundation for a breakout attempt. 
*   *Simulated Suggestion:* Hold with tight stop-losses near immediate supports. Monitor volume spikes which usually precede significant volatility windows.

*(Note: This is a high-fidelity fallback analysis generated locally because no active GEMINI_API_KEY was found in environment configurations).*`;

    // Wait a brief simulated latency for real feel
    await new Promise(resolve => setTimeout(resolve, 800));
    return res.json({
      success: true,
      simulated: true,
      text: simulatedResponse
    });
  }

  try {
    const prompt = `You are an expert Cryptocurrency Analyst and Financial Tech Writer. Analyze the following current real-time market data for ${coin.name} (${coin.symbol}):
- Price: $${coin.price.toLocaleString()}
- 24h Change: ${coin.change24h}%
- 24h High: $${coin.high24h.toLocaleString()}
- 24h Low: $${coin.low24h.toLocaleString()}
- 24h Volume: $${coin.volume24h.toLocaleString()}
- Market Cap: $${coin.marketCap.toLocaleString()}
- Current Sentiment: ${coin.sentiment}
- Coin Description: ${coin.description}

Provide a highly professional, sleek, and actionable market analysis of around 200-250 words. Format the response beautifully in Markdown. Include:
1. An Executive Summary describing current momentum.
2. Technical Insights based on high/low ranges, volume-to-market-cap ratio, and current sentiment.
3. Forward Outlook (bullish/bearish target levels or key items to watch in the next 48 hours).
Keep the tone sophisticated, authoritative, and engaging. Avoid dry templates. Do not give direct financial advice, but instead present data-driven market scenarios.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional financial analyst specialized in blockchain assets, trading indicators, and tokenomics. Deliver concise, high-signal market briefings formatted beautifully in markdown."
      }
    });

    res.json({
      success: true,
      simulated: false,
      text: response.text
    });
  } catch (error: any) {
    console.error("Error generating Gemini insights:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate market insights. Please check server logs.",
      error: error.message || error
    });
  }
});

// Configure Vite or Static Files Middleware
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files server mounted for /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to bootstrap application:", err);
});
