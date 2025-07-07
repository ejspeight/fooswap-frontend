"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, Sparkles, TrendingUp } from "lucide-react";
import { TokenLogo } from "@/components/ui/token-logo";

// Mock token data - in a real app this would come from an API
const tokens = [
  { symbol: "SUI", name: "Sui", address: "0x2::sui::SUI", logo: "S", price: "$0.85", change: "+2.4%" },
  { symbol: "USDT", name: "Tether USD", address: "0x...usdt", logo: "U", price: "$1.00", change: "0.0%" },
  { symbol: "USDC", name: "USD Coin", address: "0x...usdc", logo: "U", price: "$1.00", change: "0.0%" },
  { symbol: "FOO", name: "Foo Token", address: "0x...foo", logo: "F", price: "$0.12", change: "+15.3%" },
  { symbol: "ETH", name: "Ethereum", address: "0x...eth", logo: "E", price: "$2,450", change: "+1.2%" },
  { symbol: "BTC", name: "Bitcoin", address: "0x...btc", logo: "B", price: "$43,200", change: "+0.8%" },
];

interface Token {
  symbol: string;
  name: string;
  address: string;
  logo: string;
  price?: string;
  change?: string;
}

interface TokenSelectorProps {
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
  disabled?: boolean;
}

export function TokenSelector({ selectedToken, onTokenSelect, disabled = false }: TokenSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredTokens = tokens.filter(token =>
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="w-28 h-12 justify-between bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          disabled={disabled}
        >
          <div className="flex items-center space-x-2">
            <TokenLogo symbol={selectedToken.symbol} size="sm" className="group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium text-white">{selectedToken.symbol}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md glass-card border-white/10">
        <DialogHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <DialogTitle className="text-xl text-white">Select Token</DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-white/20 focus:ring-white/20"
            />
          </div>

          {/* Token List */}
          <div className="max-h-60 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-white/5">
            {filteredTokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => handleTokenSelect(token)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 text-left group"
              >
                <TokenLogo symbol={token.symbol} size="md" className="group-hover:scale-110 transition-transform duration-300" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{token.symbol}</div>
                      <div className="text-sm text-muted-foreground truncate">{token.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">{token.price}</div>
                      <div className={`text-xs ${token.change?.startsWith('+') ? 'text-green-400' : token.change === '0.0%' ? 'text-muted-foreground' : 'text-red-400'}`}>
                        {token.change}
                      </div>
                    </div>
                  </div>
                </div>
                {selectedToken.symbol === token.symbol && (
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"></div>
                )}
              </button>
            ))}
          </div>

          {/* No results */}
          {filteredTokens.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No tokens found matching "{searchTerm}"</p>
            </div>
          )}

          {/* Popular tokens section */}
          {!searchTerm && (
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Popular Tokens</h4>
              <div className="grid grid-cols-2 gap-2">
                {tokens.slice(0, 4).map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => handleTokenSelect(token)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                  >
                    <TokenLogo symbol={token.symbol} size="sm" />
                    <span className="text-sm font-medium text-white">{token.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 