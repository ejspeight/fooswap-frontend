// Token logo utilities using CoinGecko API and fallbacks

interface TokenLogoData {
  symbol: string;
  name: string;
  logoUrl?: string;
  fallbackColor: string;
}

// CoinGecko API base URL
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Token mapping for CoinGecko IDs
const TOKEN_MAPPING: Record<string, string> = {
  'SUI': 'sui',
  'USDT': 'tether',
  'USDC': 'usd-coin',
  'ETH': 'ethereum',
  'BTC': 'bitcoin',
  'FOO': 'foo-token', // This won't exist on CoinGecko, so we'll use fallback
};

// Fallback CDN URLs for common tokens (when CoinGecko API is rate limited)
const FALLBACK_CDN_URLS: Record<string, string> = {
  'BTC': 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  'ETH': 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  'USDT': 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
  'USDC': 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
  'SUI': 'https://assets.coingecko.com/coins/images/26375/large/sui.png',
};

// Fallback colors for tokens when API is unavailable
const FALLBACK_COLORS: Record<string, string> = {
  'SUI': 'from-indigo-500 to-purple-500',
  'USDT': 'from-green-500 to-emerald-500',
  'USDC': 'from-blue-500 to-cyan-500',
  'ETH': 'from-gray-500 to-slate-500',
  'BTC': 'from-orange-500 to-amber-500',
  'FOO': 'from-red-500 to-pink-500',
};

// Cache for logo URLs to avoid repeated API calls
const logoCache = new Map<string, string>();

/**
 * Fetch token logo from CoinGecko API with fallback to CDN
 */
export async function fetchTokenLogo(symbol: string): Promise<string | null> {
  // Check cache first
  if (logoCache.has(symbol)) {
    return logoCache.get(symbol)!;
  }

  // Try CoinGecko API first
  const coinId = TOKEN_MAPPING[symbol];
  if (coinId) {
    try {
      const response = await fetch(
        `${COINGECKO_API}/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const logoUrl = data.image?.large || data.image?.small;
        
        if (logoUrl) {
          logoCache.set(symbol, logoUrl);
          return logoUrl;
        }
      } else if (response.status === 429) {
        console.warn(`Rate limited for ${symbol}, using fallback CDN`);
      } else {
        console.warn(`Failed to fetch logo for ${symbol}: ${response.status}`);
      }
    } catch (error) {
      console.warn(`Error fetching logo for ${symbol}:`, error);
    }
  }

  // Fallback to CDN URLs
  const cdnUrl = FALLBACK_CDN_URLS[symbol];
  if (cdnUrl) {
    try {
      // Test if the CDN URL is accessible
      const response = await fetch(cdnUrl, { method: 'HEAD' });
      if (response.ok) {
        logoCache.set(symbol, cdnUrl);
        return cdnUrl;
      }
    } catch (error) {
      console.warn(`CDN fallback failed for ${symbol}:`, error);
    }
  }

  return null;
}

/**
 * Get token logo data with fallback
 */
export function getTokenLogoData(symbol: string): TokenLogoData {
  return {
    symbol,
    name: symbol,
    fallbackColor: FALLBACK_COLORS[symbol] || 'from-gray-500 to-slate-500',
  };
}

/**
 * Preload logos for common tokens with delay to avoid rate limiting
 */
export async function preloadTokenLogos(): Promise<void> {
  const commonTokens = ['SUI', 'USDT', 'USDC', 'ETH', 'BTC'];
  
  // Load logos sequentially with delay to avoid rate limiting
  for (const symbol of commonTokens) {
    try {
      await fetchTokenLogo(symbol);
      // Add a small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.warn(`Failed to preload logo for ${symbol}:`, error);
    }
  }
}

/**
 * Get logo URL from cache or return null
 */
export function getCachedLogo(symbol: string): string | null {
  return logoCache.get(symbol) || null;
} 