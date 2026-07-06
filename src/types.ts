export interface CoinHistoryData {
  day: string;
  price: number;
}

export interface CoinData {
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
  history7d: CoinHistoryData[];
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image?: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number; // 1-5 or 0-100 for visual bars
    iconName?: string;
  }[];
}
