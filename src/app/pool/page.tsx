"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { TokenSelector } from "@/components/token-selector";
import { Coins, TrendingUp, Users, Shield, Plus, Minus, ArrowRight, Sparkles } from "lucide-react";
import { TokenLogo } from "@/components/ui/token-logo";

// Mock token data
const tokens = [
  { symbol: "SUI", name: "Sui", address: "0x2::sui::SUI", logo: "S" },
  { symbol: "USDT", name: "Tether USD", address: "0x...usdt", logo: "U" },
  { symbol: "USDC", name: "USD Coin", address: "0x...usdc", logo: "U" },
  { symbol: "FOO", name: "Foo Token", address: "0x...foo", logo: "F" },
];

// Mock pool data
const pools = [
  { pair: "SUI/USDT", liquidity: "$2.4M", volume24h: "$450K", fee: "0.3%", apy: "12.5%", change: "+5.2%" },
  { pair: "SUI/USDC", liquidity: "$1.8M", volume24h: "$320K", fee: "0.3%", apy: "10.2%", change: "+2.1%" },
  { pair: "USDT/USDC", liquidity: "$950K", volume24h: "$280K", fee: "0.05%", apy: "8.7%", change: "-0.8%" },
  { pair: "FOO/SUI", liquidity: "$650K", volume24h: "$180K", fee: "0.3%", apy: "15.3%", change: "+15.3%" },
];

export default function PoolPage() {
  const [tokenA, setTokenA] = useState(tokens[0]);
  const [tokenB, setTokenB] = useState(tokens[1]);
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");



  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <Coins className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Liquidity Pools</h1>
              <p className="text-muted-foreground">
                Provide liquidity to earn trading fees and help build the ecosystem
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pool Management */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="grid w-full grid-cols-2 glass border-white/10">
                <TabsTrigger value="add" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Liquidity
                </TabsTrigger>
                <TabsTrigger value="remove" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                  <Minus className="w-4 h-4 mr-2" />
                  Remove
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="add" className="space-y-4 mt-6">
                <Card className="glass-card hover-lift">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <Plus className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">Add Liquidity</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Provide equal values of both tokens to the pool
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Token A Input */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-muted-foreground">{tokenA.symbol}</label>
                      <div className="relative">
                        <div className="flex gap-3 items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                          <Input
                            type="number"
                            placeholder="0.0"
                            value={amountA}
                            onChange={(e) => setAmountA(e.target.value)}
                            className="flex-1 bg-transparent border-0 text-white placeholder:text-muted-foreground text-lg font-medium focus:ring-0 focus:outline-none"
                          />
                          <TokenSelector
                            selectedToken={tokenA}
                            onTokenSelect={setTokenA}
                          />
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Balance: 1,234.56 {tokenA.symbol}</span>
                        <button className="text-cyan-400 hover:text-cyan-300 transition-colors">Max</button>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Token B Input */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-muted-foreground">{tokenB.symbol}</label>
                      <div className="relative">
                        <div className="flex gap-3 items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                          <Input
                            type="number"
                            placeholder="0.0"
                            value={amountB}
                            onChange={(e) => setAmountB(e.target.value)}
                            className="flex-1 bg-transparent border-0 text-white placeholder:text-muted-foreground text-lg font-medium focus:ring-0 focus:outline-none"
                          />
                          <TokenSelector
                            selectedToken={tokenB}
                            onTokenSelect={setTokenB}
                          />
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Balance: 567.89 {tokenB.symbol}</span>
                        <button className="text-green-400 hover:text-green-300 transition-colors">Max</button>
                      </div>
                    </div>

                    {/* Pool Info */}
                    {amountA && amountB && parseFloat(amountA) > 0 && parseFloat(amountB) > 0 && (
                      <div className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span className="text-sm font-medium text-white">Pool Information</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Pool Share</span>
                            <span className="text-white font-medium">0.12%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rate</span>
                            <span className="text-white font-medium">
                              1 {tokenA.symbol} = {(parseFloat(amountB) / parseFloat(amountA)).toFixed(6)} {tokenB.symbol}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                      size="lg" 
                      disabled={!amountA || !amountB || parseFloat(amountA) <= 0 || parseFloat(amountB) <= 0}
                    >
                      <div className="flex items-center space-x-2">
                        {!amountA || !amountB || parseFloat(amountA) <= 0 || parseFloat(amountB) <= 0 ? (
                          <>
                            <Shield className="h-4 w-4" />
                            <span>Enter amounts</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                            <span>Add {tokenA.symbol}-{tokenB.symbol} Liquidity</span>
                          </>
                        )}
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="remove" className="space-y-4 mt-6">
                <Card className="glass-card hover-lift">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                        <Minus className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">Remove Liquidity</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Remove your liquidity and receive both tokens back
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-muted-foreground">LP Tokens to Remove</label>
                      <div className="relative">
                        <div className="flex gap-3 items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                          <Input
                            type="number"
                            placeholder="0.0"
                            className="flex-1 bg-transparent border-0 text-white placeholder:text-muted-foreground text-lg font-medium focus:ring-0 focus:outline-none"
                          />
                          <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-white/10">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                              LP
                            </div>
                            <span className="text-white font-medium text-sm">{tokenA.symbol}-{tokenB.symbol}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        LP Balance: 123.45 {tokenA.symbol}-{tokenB.symbol}
                      </div>
                    </div>

                    <div className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-2 mb-3">
                        <ArrowRight className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-white">You'll receive</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{tokenA.symbol}</span>
                          <span className="text-white font-medium">~1,234.56</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{tokenB.symbol}</span>
                          <span className="text-white font-medium">~567.89</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full py-3 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 group">
                      <div className="flex items-center space-x-2">
                        <Minus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                        <span>Remove Liquidity</span>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Pool List */}
          <div className="lg:col-span-2">
            <Card className="glass-card hover-lift">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">Available Pools</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Browse and select pools to provide liquidity
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
                <div className="space-y-4">
                  {pools.map((pool) => (
                    <div
                      key={pool.pair}
                      className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        const [token1, token2] = pool.pair.split('/');
                        setTokenA(tokens.find(t => t.symbol === token1) || tokens[0]);
                        setTokenB(tokens.find(t => t.symbol === token2) || tokens[1]);
                      }}
                    >
                                              <div className="flex items-center space-x-4">
                          <div className="flex -space-x-2">
                            <TokenLogo symbol={pool.pair.split('/')[0]} size="lg" className="shadow-lg" />
                            <TokenLogo symbol={pool.pair.split('/')[1]} size="lg" className="shadow-lg" />
                          </div>
                        <div>
                          <div className="font-semibold text-white text-lg">{pool.pair}</div>
                          <div className="text-sm text-muted-foreground">
                            Fee: {pool.fee} • APY: {pool.apy}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white text-lg">{pool.liquidity}</div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>Vol: {pool.volume24h}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${pool.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {pool.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Your Positions */}
            <Card className="mt-6 glass-card hover-lift">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">Your Positions</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Manage your active liquidity positions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { pair: "SUI/USDT", liquidity: "$1,200", earned: "$45.67", share: "0.05%", change: "+2.1%" },
                    { pair: "FOO/SUI", liquidity: "$800", earned: "$23.45", share: "0.12%", change: "+8.7%" },
                  ].map((position) => (
                    <div key={position.pair} className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          <TokenLogo symbol={position.pair.split('/')[0]} size="lg" className="shadow-lg" />
                          <TokenLogo symbol={position.pair.split('/')[1]} size="lg" className="shadow-lg" />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-lg">{position.pair}</div>
                          <div className="text-sm text-muted-foreground">
                            Share: {position.share} • Earned: {position.earned}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white text-lg">{position.liquidity}</div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button size="sm" variant="ghost" className="hover:bg-white/10 text-white border-white/20 hover:border-white/30">
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-white/10 text-white border-white/20 hover:border-white/30">
                            <Minus className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
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