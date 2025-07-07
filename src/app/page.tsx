import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Coins, Sparkles, Zap, Shield } from "lucide-react";
import { TokenLogo } from "@/components/ui/token-logo";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16 relative z-10">
        <div className="mb-6">
          <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 px-4 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by Sui Blockchain
          </Badge>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          Welcome to <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">FooSwap</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          The premier decentralized exchange for swapping tokens and providing liquidity on the Sui blockchain. 
          Experience lightning-fast trades with minimal fees.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/swap">
            <Button size="lg" className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
              Start Swapping
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/pool">
            <Button variant="outline" size="lg" className="px-8 py-3 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 group">
              Add Liquidity
              <Coins className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
        <Card className="glass-card hover-lift group">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                Total Volume (24h)
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">$2.4M</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-lift group">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Coins className="w-4 h-4 mr-2 text-blue-400" />
                Total Liquidity
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Coins className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">$18.7M</div>
            <p className="text-xs text-blue-400">Across 24 pools</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-lift group">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Users className="w-4 h-4 mr-2 text-purple-400" />
                Active Users (24h)
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">1,247</div>
            <p className="text-xs text-purple-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.2% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Pairs */}
      <div className="mb-16 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Popular Trading Pairs</h2>
          <Badge variant="outline" className="border-white/20 text-white">
            Live Data
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { pair: "SUI/USDT", volume: "$450K", change: "+5.2%", color: "from-indigo-500 to-purple-500" },
            { pair: "SUI/USDC", volume: "$320K", change: "+2.1%", color: "from-blue-500 to-cyan-500" },
            { pair: "USDT/USDC", volume: "$280K", change: "-0.8%", color: "from-green-500 to-emerald-500" },
            { pair: "FOO/SUI", volume: "$180K", change: "+15.3%", color: "from-orange-500 to-red-500" },
            { pair: "SUI/ETH", volume: "$120K", change: "+8.7%", color: "from-purple-500 to-pink-500" },
            { pair: "USDT/ETH", volume: "$95K", change: "+3.4%", color: "from-cyan-500 to-blue-500" },
          ].map((item, index) => (
            <Card key={item.pair} className="glass-card hover-lift cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <TokenLogo symbol={item.pair.split('/')[0]} size="lg" />
                    <div>
                      <div className="font-semibold text-white text-lg">{item.pair}</div>
                      <div className="text-sm text-muted-foreground">Volume: {item.volume}</div>
                    </div>
                  </div>
                  <Badge 
                    variant={item.change.startsWith('+') ? 'default' : 'secondary'}
                    className={`${item.change.startsWith('+') ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}
                  >
                    {item.change}
                  </Badge>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full bg-gradient-to-r ${item.color} transition-all duration-300 group-hover:scale-x-110`}
                    style={{ width: `${Math.min(100, Math.max(10, Math.random() * 100))}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <Card className="glass-card hover-lift group">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-xl text-white">Swap Tokens</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground leading-relaxed">
              Instantly swap between any supported tokens with minimal slippage and competitive fees. 
              Powered by advanced AMM algorithms for optimal pricing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/swap">
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 group">
                Start Swapping
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-lift group">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-xl text-white">Provide Liquidity</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground leading-relaxed">
              Earn trading fees by providing liquidity to token pairs and help build the ecosystem. 
              Your assets are secured by smart contracts and audited protocols.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pool">
              <Button className="w-full border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm group">
                Add Liquidity
                <Coins className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
