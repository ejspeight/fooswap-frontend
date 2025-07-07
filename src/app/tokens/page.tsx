"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Coins, DollarSign, BarChart3, Sparkles } from "lucide-react";
import { TokenLogo } from "@/components/ui/token-logo";

// Mock token data
const tokens = [
  {
    symbol: "SUI",
    name: "Sui",
    address: "0x2::sui::SUI",
    price: "$0.4523",
    change24h: "+5.2%",
    marketCap: "$2.1B",
    volume24h: "$45.2M",
    supply: "10,000,000,000",
    category: "Layer 1"
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    address: "0x...usdt",
    price: "$1.0001",
    change24h: "+0.01%",
    marketCap: "$95.2B",
    volume24h: "$12.8B",
    supply: "95,200,000,000",
    category: "Stablecoin"
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0x...usdc",
    price: "$1.0000",
    change24h: "+0.00%",
    marketCap: "$32.1B",
    volume24h: "$8.9B",
    supply: "32,100,000,000",
    category: "Stablecoin"
  },
  {
    symbol: "FOO",
    name: "Foo Token",
    address: "0x...foo",
    price: "$0.0234",
    change24h: "+15.3%",
    marketCap: "$23.4M",
    volume24h: "$180K",
    supply: "1,000,000,000",
    category: "DeFi"
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0x...eth",
    price: "$2,345.67",
    change24h: "+2.8%",
    marketCap: "$281.9B",
    volume24h: "$15.2B",
    supply: "120,200,000",
    category: "Layer 1"
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    address: "0x...btc",
    price: "$43,567.89",
    change24h: "+1.5%",
    marketCap: "$856.2B",
    volume24h: "$28.9B",
    supply: "19,650,000",
    category: "Layer 1"
  },
];

export default function TokensPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTokens = tokens.filter(token =>
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Coins className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Supported Tokens</h1>
              <p className="text-muted-foreground">
                Browse all tokens available for trading on FooSwap
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-white/20 focus:ring-white/20"
            />
          </div>
        </div>

        {/* Token List */}
        <Card className="glass-card hover-lift mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">All Tokens</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {filteredTokens.length} tokens found
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-muted-foreground">Live Data</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground">Token</th>
                    <th className="text-right py-4 px-4 font-medium text-muted-foreground">Price</th>
                    <th className="text-right py-4 px-4 font-medium text-muted-foreground">24h Change</th>
                    <th className="text-right py-4 px-4 font-medium text-muted-foreground">Market Cap</th>
                    <th className="text-right py-4 px-4 font-medium text-muted-foreground">24h Volume</th>
                    <th className="text-right py-4 px-4 font-medium text-muted-foreground">Circulating Supply</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTokens.map((token) => (
                    <tr key={token.symbol} className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group">
                                             <td className="py-4 px-4">
                         <div className="flex items-center space-x-3">
                           <TokenLogo symbol={token.symbol} size="lg" className="group-hover:scale-110 transition-transform duration-300" />
                          <div>
                            <div className="font-semibold text-white">{token.symbol}</div>
                            <div className="text-sm text-muted-foreground">{token.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-4 font-medium text-white">
                        {token.price}
                      </td>
                      <td className="text-right py-4 px-4">
                        <Badge 
                          variant="outline"
                          className={`${token.change24h.startsWith('+') ? 'border-green-500/30 text-green-400 bg-green-500/10' : token.change24h.startsWith('-') ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-muted-foreground/30 text-muted-foreground bg-muted-foreground/10'}`}
                        >
                          {token.change24h}
                        </Badge>
                      </td>
                      <td className="text-right py-4 px-4 text-muted-foreground">
                        {token.marketCap}
                      </td>
                      <td className="text-right py-4 px-4 text-muted-foreground">
                        {token.volume24h}
                      </td>
                      <td className="text-right py-4 px-4 text-muted-foreground">
                        {token.supply}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Token Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-card hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">Stablecoins</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    USD-pegged tokens for stable trading
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tokens.filter(t => ['USDT', 'USDC'].includes(t.symbol)).map(token => (
                  <div key={token.symbol} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center space-x-3">
                      <TokenLogo symbol={token.symbol} size="md" />
                      <span className="font-medium text-white">{token.symbol}</span>
                    </div>
                    <span className="text-muted-foreground">{token.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">Major Cryptocurrencies</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    High market cap digital assets
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tokens.filter(t => ['SUI', 'ETH', 'BTC'].includes(t.symbol)).map(token => (
                  <div key={token.symbol} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center space-x-3">
                      <TokenLogo symbol={token.symbol} size="md" />
                      <span className="font-medium text-white">{token.symbol}</span>
                    </div>
                    <span className="text-muted-foreground">{token.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">DeFi Tokens</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Decentralized finance protocols
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tokens.filter(t => ['FOO'].includes(t.symbol)).map(token => (
                  <div key={token.symbol} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center space-x-3">
                      <TokenLogo symbol={token.symbol} size="md" />
                      <span className="font-medium text-white">{token.symbol}</span>
                    </div>
                    <span className="text-muted-foreground">{token.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 