"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SwapPanel } from "@/components/swap-panel";
import { TrendingUp, Clock, Zap, ArrowRight } from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  address: string;
  logo: string;
}

export default function SwapPage() {
  const handleSwap = (tokenA: Token, tokenB: Token, amountA: string, amountB: string) => {
    // TODO: Implement actual swap logic
    console.log(`Swapping ${amountA} ${tokenA.symbol} for ${amountB} ${tokenB.symbol}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-500/20 to-red-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Swap Tokens</h1>
              <p className="text-muted-foreground">
                Trade tokens instantly with minimal slippage
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Swap Panel */}
          <div className="lg:col-span-1">
            <SwapPanel onSwap={handleSwap} />
          </div>

          {/* Market Data & Recent Transactions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Overview */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">Market Overview</CardTitle>
                    <p className="text-muted-foreground">Live market data and trends</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { pair: "SUI/USDT", price: "$0.85", change: "+2.4%", volume: "$450K" },
                    { pair: "SUI/USDC", price: "$0.85", change: "+1.2%", volume: "$320K" },
                    { pair: "FOO/SUI", price: "$0.12", change: "+15.3%", volume: "$180K" },
                    { pair: "USDT/USDC", price: "$1.00", change: "0.0%", volume: "$280K" },
                  ].map((item) => (
                    <div key={item.pair} className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
                      <div>
                        <div className="font-semibold text-white">{item.pair}</div>
                        <div className="text-sm text-muted-foreground">Vol: {item.volume}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">{item.price}</div>
                        <div className={`text-sm ${item.change.startsWith('+') ? 'text-green-400' : item.change === '0.0%' ? 'text-muted-foreground' : 'text-red-400'}`}>
                          {item.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">Recent Swaps</CardTitle>
                    <p className="text-muted-foreground">Latest transactions on the network</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { from: "100 SUI", to: "45.23 USDT", time: "2 min ago", status: "success" },
                    { from: "50 USDC", to: "110.5 SUI", time: "5 min ago", status: "success" },
                    { from: "25 FOO", to: "12.34 SUI", time: "8 min ago", status: "success" },
                    { from: "200 USDT", to: "425.67 SUI", time: "12 min ago", status: "success" },
                    { from: "75 SUI", to: "33.89 USDC", time: "15 min ago", status: "success" },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {tx.from} <span className="text-muted-foreground">→</span> {tx.to}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {tx.time}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`border-green-500/30 text-green-400 bg-green-500/10 ${tx.status === 'success' ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}`}
                      >
                        {tx.status === 'success' ? 'Success' : 'Failed'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 