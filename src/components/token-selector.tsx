"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";

// Mock token data - in a real app this would come from an API
const tokens = [
  { symbol: "SUI", name: "Sui", address: "0x2::sui::SUI", logo: "S" },
  { symbol: "USDT", name: "Tether USD", address: "0x...usdt", logo: "U" },
  { symbol: "USDC", name: "USD Coin", address: "0x...usdc", logo: "U" },
  { symbol: "FOO", name: "Foo Token", address: "0x...foo", logo: "F" },
  { symbol: "ETH", name: "Ethereum", address: "0x...eth", logo: "E" },
  { symbol: "BTC", name: "Bitcoin", address: "0x...btc", logo: "B" },
];

interface Token {
  symbol: string;
  name: string;
  address: string;
  logo: string;
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
          variant="outline" 
          className="w-24 justify-between"
          disabled={disabled}
        >
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              {selectedToken.logo}
            </div>
            <span className="font-medium">{selectedToken.symbol}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Token List */}
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredTokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => handleTokenSelect(token)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {token.logo}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{token.symbol}</div>
                  <div className="text-sm text-muted-foreground">{token.name}</div>
                </div>
                {selectedToken.symbol === token.symbol && (
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                )}
              </button>
            ))}
          </div>

          {/* No results */}
          {filteredTokens.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No tokens found matching "{searchTerm}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 