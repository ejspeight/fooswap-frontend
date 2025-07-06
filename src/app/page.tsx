import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-primary">FooSwap</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The premier decentralized exchange for swapping tokens and providing liquidity on the Sui blockchain.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/swap">
            <Button size="lg" className="px-8">
              Start Swapping
            </Button>
          </Link>
          <Link href="/pool">
            <Button variant="outline" size="lg" className="px-8">
              Add Liquidity
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Volume (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">+12.5% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Liquidity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18.7M</div>
            <p className="text-xs text-muted-foreground">Across 24 pools</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+8.2% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Pairs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Trading Pairs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { pair: "SUI/USDT", volume: "$450K", change: "+5.2%" },
            { pair: "SUI/USDC", volume: "$320K", change: "+2.1%" },
            { pair: "USDT/USDC", volume: "$280K", change: "-0.8%" },
            { pair: "FOO/SUI", volume: "$180K", change: "+15.3%" },
            { pair: "SUI/ETH", volume: "$120K", change: "+8.7%" },
            { pair: "USDT/ETH", volume: "$95K", change: "+3.4%" },
          ].map((item) => (
            <Card key={item.pair} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{item.pair}</div>
                    <div className="text-sm text-muted-foreground">Volume: {item.volume}</div>
                  </div>
                  <Badge variant={item.change.startsWith('+') ? 'default' : 'secondary'}>
                    {item.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Swap Tokens</CardTitle>
            <CardDescription>
              Instantly swap between any supported tokens with minimal slippage and competitive fees.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/swap">
              <Button className="w-full">Start Swapping</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Provide Liquidity</CardTitle>
            <CardDescription>
              Earn trading fees by providing liquidity to token pairs and help build the ecosystem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pool">
              <Button className="w-full" variant="outline">Add Liquidity</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
