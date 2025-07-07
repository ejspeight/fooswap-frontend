"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ConnectButton } from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wallet, Sparkles } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Swap", href: "/swap" },
  { name: "Pool", href: "/pool" },
  { name: "Tokens", href: "/tokens" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="glass border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="token-logo group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  FooSwap
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Sui DEX</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group",
                    pathname === item.href
                      ? "text-white bg-white/10 backdrop-blur-sm"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  {pathname === item.href && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Wallet Connect */}
          <div className="flex items-center space-x-3">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-4 hover:bg-white/10"
              onClick={toggleMobileMenu}
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
            
            {/* Wallet Connect Button */}
            <div className="hidden md:block relative group">
              <ConnectButton 
                className="!bg-gradient-to-r !from-indigo-500 !to-purple-600 !text-white !border-0 !px-6 !py-2 !rounded-lg !font-medium !shadow-lg hover:!shadow-xl hover:!scale-105 transition-all duration-300 !backdrop-blur-sm"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  pathname === item.href
                    ? "text-white bg-white/10"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Wallet Connect Button */}
            <div className="pt-4 border-t border-white/10 mt-4">
              <div className="relative group">
                <ConnectButton 
                  className="!bg-gradient-to-r !from-indigo-500 !to-purple-600 !text-white !border-0 !w-full !px-6 !py-3 !rounded-lg !font-medium !shadow-lg hover:!shadow-xl transition-all duration-300 !backdrop-blur-sm"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 