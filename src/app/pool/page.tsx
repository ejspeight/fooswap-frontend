"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { TokenSelector } from "@/components/token-selector";

// Mock token data
const tokens = [
  { symbol: "SUI", name: "Sui", address: "0x2::sui::SUI", logo: "S" },
  { symbol: "USDT", name: "Tether USD", address: "0x...usdt", logo: "U" },
  { symbol: "USDC", name: "USD Coin", address: "0x...usdc", logo: "U" },
  { symbol: "FOO", name: "Foo Token", address: "0x...foo", logo: "F" },
];

// Mock pool data
const pools = [
  { pair: "SUI/USDT", liquidity: "$2.4M", volume24h: "$450K", fee: "0.3%", apy: "12.5%" },
  { pair: "SUI/USDC", liquidity: "$1.8M", volume24h: "$320K", fee: "0.3%", apy: "10.2%" },
  { pair: "USDT/USDC", liquidity: "$950K", volume24h: "$280K", fee: "0.05%", apy: "8.7%" },
  { pair: "FOO/SUI", liquidity: "$650K", volume24h: "$180K", fee: "0.3%", apy: "15.3%" },
];

export default function PoolPage() {
  const [tokenA, setTokenA] = useState(tokens[0]);
  const [tokenB, setTokenB] = useState(tokens[1]);
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Liquidity Pools</h1>
          <p className="text-muted-foreground">
            Provide liquidity to earn trading fees and help build the ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pool Management */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="add">Add Liquidity</TabsTrigger>
                <TabsTrigger value="remove">Remove</TabsTrigger>
              </TabsList>
              
              <TabsContent value="add" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Liquidity</CardTitle>
                    <CardDescription>
                      Provide equal values of both tokens to the pool
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Token A Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{tokenA.symbol}</label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={amountA}
                          onChange={(e) => setAmountA(e.target.value)}
                          className="flex-1"
                        />
                        <TokenSelector
                          selectedToken={tokenA}
                          onTokenSelect={setTokenA}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Balance: 1,234.56 {tokenA.symbol}
                      </div>
                    </div>

                    <Separator />

                    {/* Token B Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{tokenB.symbol}</label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={amountB}
                          onChange={(e) => setAmountB(e.target.value)}
                          className="flex-1"
                        />
                        <TokenSelector
                          selectedToken={tokenB}
                          onTokenSelect={setTokenB}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Balance: 567.89 {tokenB.symbol}
                      </div>
                    </div>

                    {/* Pool Info */}
                    {amountA && amountB && (
                      <div className="space-y-2 p-3 bg-muted rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span>Pool Share</span>
                          <span>0.12%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rate</span>
                          <span>1 {tokenA.symbol} = {(parseFloat(amountB) / parseFloat(amountA)).toFixed(6)} {tokenB.symbol}</span>
                        </div>
                      </div>
                    )}

                    <Button className="w-full" size="lg" disabled={!amountA || !amountB}>
                      {!amountA || !amountB ? "Enter amounts" : `Add ${tokenA.symbol}-${tokenB.symbol} Liquidity`}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="remove" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Remove Liquidity</CardTitle>
                    <CardDescription>
                      Remove your liquidity and receive both tokens back
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">LP Tokens to Remove</label>
                      <Input
                        type="number"
                        placeholder="0.0"
                        className="w-full"
                      />
                      <div className="text-xs text-muted-foreground">
                        LP Balance: 123.45 {tokenA.symbol}-{tokenB.symbol}
                      </div>
                    </div>

                    <div className="space-y-2 p-3 bg-muted rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>You'll receive</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{tokenA.symbol}</span>
                        <span>~1,234.56</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{tokenB.symbol}</span>
                        <span>~567.89</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" variant="outline">
                      Remove Liquidity
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Pool List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Available Pools</CardTitle>
                <CardDescription>
                  Browse and select pools to provide liquidity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pools.map((pool) => (
                    <div
                      key={pool.pair}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => {
                        const [token1, token2] = pool.pair.split('/');
                        setTokenA(tokens.find(t => t.symbol === token1) || tokens[0]);
                        setTokenB(tokens.find(t => t.symbol === token2) || tokens[1]);
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                            {pool.pair.split('/')[0][0]}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-bold">
                            {pool.pair.split('/')[1][0]}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{pool.pair}</div>
                          <div className="text-sm text-muted-foreground">
                            Fee: {pool.fee} • APY: {pool.apy}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{pool.liquidity}</div>
                        <div className="text-sm text-muted-foreground">
                          Vol: {pool.volume24h}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Your Positions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Your Positions</CardTitle>
                <CardDescription>
                  Manage your active liquidity positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { pair: "SUI/USDT", liquidity: "$1,200", earned: "$45.67", share: "0.05%" },
                    { pair: "FOO/SUI", liquidity: "$800", earned: "$23.45", share: "0.12%" },
                  ].map((position) => (
                    <div key={position.pair} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-semibold">{position.pair}</div>
                        <div className="text-sm text-muted-foreground">
                          Share: {position.share} • Earned: {position.earned}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{position.liquidity}</div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">Add</Button>
                          <Button size="sm" variant="outline">Remove</Button>
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