import { useState, useEffect } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { 
  Sparkles, TrendingUp, TrendingDown, DollarSign, BarChart2, Github, ExternalLink, 
  Layers, Lock, Database, Terminal, RefreshCw, Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CoinData, Project } from "../types";

export default function Projects() {
  // Cryptocurrency Dashboard State
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [aiInsights, setAiInsights] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingCoins, setLoadingCoins] = useState<boolean>(true);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  // Other secondary projects to populate portfolio
  const otherProjects: Project[] = [
    {
      id: "api-gateway",
      title: "Microservices API Gateway",
      description: "A high-performance, containerized API routing gateway built with Go and gRPC, capable of load balancing and token-bucket rate-limiting.",
      tags: ["Go", "gRPC", "Docker", "Redis", "Protobuf"],
      githubUrl: "https://github.com",
      featured: false,
    },
    {
      id: "distributed-db",
      title: "Distributed Key-Value Store",
      description: "A fault-tolerant key-value datastore implementing Raft consensus algorithm with log replication and persistent disk storage engine.",
      tags: ["Rust", "Raft", "Multi-Threading", "TCP/IP"],
      githubUrl: "https://github.com",
      featured: false,
    }
  ];

  // Fetch cryptocurrency listings on mount
  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      setLoadingCoins(true);
      const res = await fetch("/api/crypto/market-data");
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setCoins(json.data);
        setSelectedCoin(json.data[0]); // Default select BTC
      }
    } catch (err) {
      console.error("Failed to fetch coins market-data:", err);
    } finally {
      setLoadingCoins(false);
    }
  };

  // Generate automated insights via Gemini backend API
  const generateInsights = async () => {
    if (!selectedCoin) return;
    try {
      setIsGenerating(true);
      setAiInsights("");
      
      const response = await fetch("/api/crypto/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ symbol: selectedCoin.symbol })
      });
      
      const data = await response.json();
      if (data.success) {
        setAiInsights(data.text);
        setIsSimulated(!!data.simulated);
      } else {
        setAiInsights("Failed to fetch dynamic AI insights from the server. Please verify your GEMINI_API_KEY.");
      }
    } catch (err: any) {
      console.error("Error fetching insights:", err);
      setAiInsights("Error connecting to full-stack backend endpoint. Make sure the server is fully compiled and active.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Custom parser to format backend Markdown elegantly with Tailwind
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => {
      // Headers
      if (line.startsWith("### ")) {
        return (
          <h4 key={index} className="text-base sm:text-lg font-display font-semibold text-cyan-400 mt-5 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("#### ")) {
        return (
          <h5 key={index} className="text-sm sm:text-base font-display font-medium text-white mt-4 mb-2 border-b border-gray-800 pb-1">
            {line.replace("#### ", "")}
          </h5>
        );
      }
      // Bullet lists
      if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        const cleanLine = line.replace(/^[\s*-]+/, "").trim();
        const formatted = cleanLine.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        return (
          <li key={index} className="text-xs sm:text-sm text-gray-400 font-sans ml-5 list-disc mt-1" dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      }
      // Regular Paragraphs with bold replacements
      if (line.trim() === "") return <div key={index} className="h-2" />;
      
      const formattedParagraph = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return (
        <p key={index} className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mt-2" dangerouslySetInnerHTML={{ __html: formattedParagraph }} />
      );
    });
  };

  return (
    <section id="projects" className="py-24 bg-[#0a0a0a] relative border-t border-zinc-800/50">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-2">
            <Layers className="w-4 h-4" />
            <span>PORTFOLIO SELECTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-white">
            Projects &amp; Live Demos
          </h2>
          <p className="text-zinc-400 font-sans font-light mt-4 leading-relaxed text-base sm:text-lg">
            Explore my work, featuring modular architectures and full-stack implementations. Play with the interactive live cryptocurrency dashboard below.
          </p>
        </div>

        {/* Featured Project - Interactive Cryptocurrency Dashboard */}
        <div className="mb-16">
          <div className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold mb-4 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping"></span>
            FEATURED FULL-STACK INTERACTIVE PLAYGROUND
          </div>

          <div className="bg-[#121212] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl hover:border-cyan-500/10 transition-all duration-300 relative">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            {/* Project Banner Header */}
            <div className="p-6 sm:p-8 border-b border-zinc-800/50 bg-[#121212] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
              <div>
                <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-mono font-bold rounded-full bg-cyan-500/5 text-cyan-400 border border-cyan-500/20">
                  Featured Project
                </span>
                <h3 className="text-xl sm:text-3xl font-display font-medium text-white mt-4">
                  Cryptocurrency Analytics Dashboard
                </h3>
                <p className="text-sm text-zinc-400 font-sans font-light mt-2 max-w-2xl">
                  A high-premium, real-time tracking application connecting React with a custom Express backend. Uses the official Google GenAI SDK (Gemini 3.5 Flash) to analyze price indicators and automatically formulate trading sentiments.
                </p>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 pt-1 lg:pt-0">
                {["TypeScript", "React", "Recharts", "Express.js", "Gemini AI"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-zinc-950 border border-zinc-800 text-zinc-450">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Dashboard Workspace */}
            {loadingCoins ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <RefreshCw className="w-8 h-8 text-cyan-500 animate-spin" />
                <p className="text-sm text-zinc-500 font-mono">Loading real-time market streams...</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-12 relative z-10">
                
                {/* Left Side: Coin Selector & Stats */}
                <div className="lg:col-span-4 p-6 sm:p-8 border-r border-zinc-800/50 flex flex-col gap-6">
                  <div>
                    <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                      Select Crypto Asset
                    </h4>
                    
                    {/* Coin list */}
                    <div className="grid grid-cols-2 gap-2">
                      {coins.map((coin) => {
                        const isSelected = selectedCoin?.symbol === coin.symbol;
                        return (
                          <button
                            key={coin.symbol}
                            onClick={() => {
                              setSelectedCoin(coin);
                              setAiInsights(""); // Reset insights on switch
                            }}
                            className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all ${
                              isSelected
                                ? "bg-cyan-500/5 border-cyan-500/30 text-white"
                                : "bg-zinc-950 border-zinc-800/40 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/40"
                            }`}
                          >
                            <span className="text-[10px] font-mono font-bold tracking-wide text-zinc-500">
                              {coin.symbol}
                            </span>
                            <span className="text-sm font-semibold mt-0.5 truncate w-full">
                              {coin.name}
                            </span>
                            <span className="text-xs font-mono mt-1 font-semibold text-white">
                              ${coin.price >= 1000 ? coin.price.toLocaleString() : coin.price.toFixed(2)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Coin Metrics Cards */}
                  {selectedCoin && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-t border-zinc-800/50 pt-4">
                        24h Market Summary
                      </h4>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800/50">
                          <p className="text-[10px] font-mono text-zinc-500 uppercase">Current Price</p>
                          <p className="text-sm font-semibold text-white mt-1">
                            ${selectedCoin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </p>
                        </div>

                        <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800/50">
                          <p className="text-[10px] font-mono text-zinc-500 uppercase">24h Change</p>
                          <div className={`flex items-center gap-1 text-sm font-semibold mt-1 ${
                            selectedCoin.change24h >= 0 ? "text-emerald-400" : "text-rose-400"
                          }`}>
                            {selectedCoin.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            <span>{selectedCoin.change24h >= 0 ? "+" : ""}{selectedCoin.change24h}%</span>
                          </div>
                        </div>

                        <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800/50">
                          <p className="text-[10px] font-mono text-zinc-500 uppercase">Trading Volume</p>
                          <p className="text-sm font-semibold text-white mt-1 font-mono">
                            ${(selectedCoin.volume24h / 1e9).toFixed(1)}B
                          </p>
                        </div>

                        <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800/50">
                          <p className="text-[10px] font-mono text-zinc-500 uppercase">Market Sentiment</p>
                          <p className={`text-sm font-semibold mt-1 ${
                            selectedCoin.sentiment === "Bullish" ? "text-emerald-400" : selectedCoin.sentiment === "Bearish" ? "text-rose-400" : "text-amber-400"
                          }`}>
                            {selectedCoin.sentiment}
                          </p>
                        </div>
                      </div>

                      {/* Rank Label */}
                      <div className="flex items-center justify-between text-xs bg-zinc-950/50 p-2.5 rounded-xl border border-zinc-800/40 text-zinc-450">
                        <span className="font-mono">Global Market Cap Rank:</span>
                        <span className="font-mono text-white font-bold">#{selectedCoin.rank}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Recharts Chart & Gemini AI Console */}
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between gap-6">
                  
                  {/* Chart Wrapper */}
                  {selectedCoin && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                          <BarChart2 className="w-4 h-4 text-cyan-500" />
                          7-Day Price Flow Chart
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase bg-zinc-950/45 border border-zinc-800 rounded px-2.5 py-0.5">
                          Time Interval: 24h
                        </span>
                      </div>

                      {/* Recharts Component */}
                      <div className="h-56 w-full bg-zinc-950/40 border border-zinc-800/50 rounded-2xl p-4 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={selectedCoin.history7d} margin={{ top: 10, right: 10, left: -20, bottom: -5 }}>
                            <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} opacity={0.25} />
                            <XAxis 
                              dataKey="day" 
                              stroke="#71717a" 
                              fontSize={10} 
                              fontFamily="monospace"
                              tickLine={false} 
                            />
                            <YAxis 
                              stroke="#71717a" 
                              fontSize={10} 
                              fontFamily="monospace"
                              tickLine={false}
                              axisLine={false}
                              domain={['auto', 'auto']}
                              tickFormatter={(v) => `$${v >= 1000 ? v.toLocaleString() : v.toFixed(1)}`}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#121212', 
                                border: '1px solid #27272a', 
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontFamily: 'Inter, sans-serif'
                              }}
                              itemStyle={{ color: '#06b6d4' }}
                              labelStyle={{ color: '#71717a', fontSize: '10px', fontFamily: 'monospace' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="price" 
                              stroke="#06b6d4" 
                              strokeWidth={2}
                              dot={{ r: 3, stroke: '#06b6d4', strokeWidth: 1, fill: '#121212' }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* AI Insights Console */}
                  <div className="bg-zinc-950 rounded-2xl border border-zinc-800/60 p-5 mt-2 flex flex-col gap-4 relative overflow-hidden">
                    
                    {/* Console Header */}
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-cyan-500">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-mono font-semibold text-white tracking-wide">
                            Gemini AI Analytical Agent
                          </p>
                          <p className="text-[10px] font-mono text-zinc-500">
                            Model: gemini-3.5-flash
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={generateInsights}
                        disabled={isGenerating || !selectedCoin}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 hover:bg-cyan-500 disabled:bg-zinc-900 disabled:text-zinc-650 text-black text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Analyzing Indicators...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            Generate AI Analysis
                          </>
                        )}
                      </button>
                    </div>

                    {/* Console Output Screen */}
                    <div className="min-h-36 max-h-72 overflow-y-auto pr-1">
                      <AnimatePresence mode="wait">
                        {isGenerating ? (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-start gap-3 py-4"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                              <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">CONNECTING TO SERVER PROXY ENTRANCE...</p>
                            </div>
                            <p className="text-xs text-zinc-500 font-sans leading-relaxed pl-4 animate-pulse">
                              Extracting price volumes, historical support thresholds, sentiment indices, and tokenomics metrics...
                            </p>
                          </motion.div>
                        ) : aiInsights ? (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="prose prose-invert max-w-none text-left"
                          >
                            {isSimulated && (
                              <div className="mb-4 px-3 py-2 rounded-lg bg-amber-950/20 border border-amber-500/10 text-[10px] font-mono text-amber-400">
                                💡 Notice: Running in sandbox mode with high-fidelity simulated analysis. Configure your GEMINI_API_KEY inside the Secrets panel to activate live API synthesis.
                              </div>
                            )}
                            <div className="space-y-1">
                              {renderMarkdown(aiInsights)}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-8 text-center text-zinc-500"
                          >
                            <Terminal className="w-6 h-6 text-zinc-650 mb-2" />
                            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600">Console Idle. Select an asset and hit 'Generate AI Analysis' above.</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>

                </div>

              </div>
            )}
          </div>
        </div>

        {/* Secondary Projects Grid */}
        <div>
          <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6">
            Other Scalable Projects
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-3xl bg-[#121212] border border-zinc-800 hover:border-cyan-500/20 transition-all duration-300 flex flex-col justify-between gap-6 group relative overflow-hidden"
              >
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/2 rounded-full blur-[80px] pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-cyan-500">
                      <Terminal className="w-4 h-4" />
                    </span>
                    <div className="flex items-center gap-3 text-zinc-500">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-500 transition-colors"
                        title="View Source on GitHub"
                      >
                        <Github className="w-4.5 h-4.5" />
                      </a>
                    </div>
                  </div>

                  <h5 className="font-display font-medium text-lg text-white mt-4">
                    {project.title}
                  </h5>
                  <p className="text-sm text-zinc-400 font-sans font-light mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/50 relative z-10">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full text-[10px] font-mono text-zinc-450 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
