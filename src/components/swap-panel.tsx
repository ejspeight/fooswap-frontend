"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownUp, Settings } from "lucide-react";
import { TokenSelector } from "./token-selector";

interface Token {
  symbol: string;
  name: string;
  address: string;
  logo: string;
}

interface SwapPanelProps {
  onSwap?: (tokenA: Token, tokenB: Token, amountA: string, amountB: string) => void;
}

export function SwapPanel({ onSwap }: SwapPanelProps) {
  const [tokenA, setTokenA] = useState<Token>({ symbol: "SUI", name: "Sui", address: "0x2::sui::SUI", logo: "S" });
  const [tokenB, setTokenB] = useState<Token>({ symbol: "USDT", name: "Tether USD", address: "0x...usdt", logo: "U" });
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  const handleSwapTokens = () => {
    setTokenA(tokenB);
    setTokenB(tokenA);
    setAmountA(amountB);
    setAmountB(amountA);
  };

  const handleSwap = () => {
    if (onSwap && amountA && amountB) {
      onSwap(tokenA, tokenB, amountA, amountB);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Swap Tokens</CardTitle>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Trade tokens instantly on the Sui blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Token A Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">You Pay</label>
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

        {/* Swap Direction Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwapTokens}
            className="rounded-full p-2"
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* Token B Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">You Receive</label>
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

        {/* Price Information */}
        {amountA && amountB && parseFloat(amountA) > 0 && parseFloat(amountB) > 0 && (
          <div className="space-y-2 p-3 bg-muted rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Price</span>
              <span>1 {tokenA.symbol} = {(parseFloat(amountB) / parseFloat(amountA)).toFixed(6)} {tokenB.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Slippage</span>
              <span>0.5%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Fee</span>
              <span>0.3%</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button 
          className="w-full" 
          size="lg" 
          disabled={!amountA || !amountB || parseFloat(amountA) <= 0 || parseFloat(amountB) <= 0}
          onClick={handleSwap}
        >
          {!amountA || !amountB || parseFloat(amountA) <= 0 || parseFloat(amountB) <= 0 ? "Enter an amount" : `Swap ${tokenA.symbol} for ${tokenB.symbol}`}
        </Button>

        {/* Additional Info */}
        <div className="text-xs text-muted-foreground text-center">
          By swapping, you agree to our{" "}
          <a href="#" className="underline">Terms of Service</a>
        </div>
      </CardContent>
    </Card>
  );
} 