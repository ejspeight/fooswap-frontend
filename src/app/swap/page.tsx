"use client";

import { Badge } from "@/components/ui/badge";
import { SwapPanel } from "@/components/swap-panel";

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <SwapPanel onSwap={handleSwap} />

        {/* Recent Transactions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Swaps</h3>
          <div className="space-y-2">
            {[
              { from: "100 SUI", to: "45.23 USDT", time: "2 min ago" },
              { from: "50 USDC", to: "110.5 SUI", time: "5 min ago" },
              { from: "25 FOO", to: "12.34 SUI", time: "8 min ago" },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">{tx.from} → {tx.to}</div>
                  <div className="text-xs text-muted-foreground">{tx.time}</div>
                </div>
                <Badge variant="secondary">Success</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 