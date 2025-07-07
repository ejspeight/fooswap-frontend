"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { fetchTokenLogo, getCachedLogo, getTokenLogoData } from "@/lib/token-logos";

interface TokenLogoProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showFallback?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
  xl: 'w-12 h-12 text-lg',
};

export function TokenLogo({ symbol, size = 'md', className, showFallback = true }: TokenLogoProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(getCachedLogo(symbol));
  const [isLoading, setIsLoading] = useState(!logoUrl);
  const [hasError, setHasError] = useState(false);

  const tokenData = getTokenLogoData(symbol);

  useEffect(() => {
    if (!logoUrl && !hasError) {
      setIsLoading(true);
      fetchTokenLogo(symbol)
        .then((url) => {
          if (url) {
            setLogoUrl(url);
            console.log(`✅ Loaded logo for ${symbol}:`, url);
          } else {
            setHasError(true);
            console.log(`⚠️ No logo available for ${symbol}, using fallback`);
          }
        })
        .catch((error) => {
          setHasError(true);
          console.warn(`❌ Failed to load logo for ${symbol}:`, error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [symbol, logoUrl, hasError]);

  // Show real logo if available
  if (logoUrl && !isLoading) {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <img
          src={logoUrl}
          alt={`${symbol} logo`}
          className="w-full h-full rounded-full object-cover"
          onError={() => {
            console.warn(`❌ Image failed to load for ${symbol}:`, logoUrl);
            setHasError(true);
            setLogoUrl(null);
          }}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        )}
      </div>
    );
  }

  // Show fallback if enabled and no real logo
  if (showFallback && (hasError || !logoUrl)) {
    return (
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white shadow-lg",
          sizeClasses[size],
          `bg-gradient-to-r ${tokenData.fallbackColor}`,
          className
        )}
      >
        {symbol[0]}
      </div>
    );
  }

  // Show loading state
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-r from-gray-400 to-gray-500 animate-pulse",
        sizeClasses[size],
        className
      )}
    />
  );
} 