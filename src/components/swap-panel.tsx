"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownUp, Settings, Zap, TrendingUp, Shield } from "lucide-react";
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

  const getTokenLogoClass = (symbol: string) => {
    const colors = {
      'SUI': 'token-logo',
      'USDT': 'token-logo-secondary',
      'USDC': 'token-logo-secondary',
      'FOO': 'token-logo-accent',
      'ETH': 'token-logo',
      'BTC': 'token-logo-accent'
    };
    return colors[symbol as keyof typeof colors] || 'token-logo';
  };

  return (
    <Card className="glass-card hover-lift max-w-md mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">Swap Tokens</CardTitle>
              <CardDescription className="text-muted-foreground">
                Trade tokens instantly on the Sui blockchain
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="hover:bg-white/10 text-muted-foreground hover:text-white">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token A Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground">You Pay</label>
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
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Balance: 1,234.56 {tokenA.symbol}</span>
            <button className="text-indigo-400 hover:text-indigo-300 transition-colors">Max</button>
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSwapTokens}
            className="rounded-full p-3 hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
          >
            <div className="relative">
              <ArrowDownUp className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
            </div>
          </Button>
        </div>

        {/* Token B Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground">You Receive</label>
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
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Balance: 567.89 {tokenB.symbol}</span>
          </div>
        </div>

        {/* Price Information */}
        {amountA && amountB && parseFloat(amountA) > 0 && parseFloat(amountB) > 0 && (
          <div className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-white">Price Information</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price</span>
                <span className="text-white font-medium">
                  1 {tokenA.symbol} = {(parseFloat(amountB) / parseFloat(amountA)).toFixed(6)} {tokenB.symbol}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Slippage</span>
                <span className="text-green-400">0.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee</span>
                <span className="text-blue-400">0.3%</span>
              </div>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button 
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
          size="lg" 
          disabled={!amountA || !amountB || parseFloat(amountA) <= 0 || parseFloat(amountB) <= 0}
          onClick={handleSwap}
        >
          <div className="flex items-center space-x-2">
            {!amountA || !amountB || parseFloat(amountA) <= 0 || parseFloat(amountB) <= 0 ? (
              <>
                <Shield className="h-4 w-4" />
                <span>Enter an amount</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                <span>Swap {tokenA.symbol} for {tokenB.symbol}</span>
              </>
            )}
          </div>
        </Button>

        {/* Additional Info */}
        <div className="text-xs text-muted-foreground text-center pt-2">
          By swapping, you agree to our{" "}
          <a href="#" className="text-indigo-400 hover:text-indigo-300 underline transition-colors">Terms of Service</a>
        </div>
      </CardContent>
    </Card>
  );
} 