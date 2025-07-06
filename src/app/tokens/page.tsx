"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

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
  },
];

export default function TokensPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTokens = tokens.filter(token =>
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Supported Tokens</h1>
        <p className="text-muted-foreground">
          Browse all tokens available for trading on FooSwap
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Token List */}
      <Card>
        <CardHeader>
          <CardTitle>All Tokens</CardTitle>
          <CardDescription>
            {filteredTokens.length} tokens found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Token</th>
                  <th className="text-right py-3 px-4 font-medium">Price</th>
                  <th className="text-right py-3 px-4 font-medium">24h Change</th>
                  <th className="text-right py-3 px-4 font-medium">Market Cap</th>
                  <th className="text-right py-3 px-4 font-medium">24h Volume</th>
                  <th className="text-right py-3 px-4 font-medium">Circulating Supply</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token) => (
                  <tr key={token.symbol} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {token.symbol[0]}
                        </div>
                        <div>
                          <div className="font-semibold">{token.symbol}</div>
                          <div className="text-sm text-muted-foreground">{token.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-medium">
                      {token.price}
                    </td>
                    <td className="text-right py-4 px-4">
                      <Badge 
                        variant={token.change24h.startsWith('+') ? 'default' : 'secondary'}
                        className={token.change24h.startsWith('-') ? 'bg-red-100 text-red-800' : ''}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Stablecoins</CardTitle>
            <CardDescription>
              USD-pegged tokens for stable trading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tokens.filter(t => ['USDT', 'USDC'].includes(t.symbol)).map(token => (
                <div key={token.symbol} className="flex justify-between items-center">
                  <span className="font-medium">{token.symbol}</span>
                  <span className="text-muted-foreground">{token.price}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Major Cryptocurrencies</CardTitle>
            <CardDescription>
              High market cap digital assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tokens.filter(t => ['SUI', 'ETH', 'BTC'].includes(t.symbol)).map(token => (
                <div key={token.symbol} className="flex justify-between items-center">
                  <span className="font-medium">{token.symbol}</span>
                  <span className="text-muted-foreground">{token.price}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ecosystem Tokens</CardTitle>
            <CardDescription>
              Tokens native to the Sui ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tokens.filter(t => ['FOO'].includes(t.symbol)).map(token => (
                <div key={token.symbol} className="flex justify-between items-center">
                  <span className="font-medium">{token.symbol}</span>
                  <span className="text-muted-foreground">{token.price}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 