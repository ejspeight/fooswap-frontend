"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

export function ClientRoot({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={{
          mainnet: new SuiClient({ url: getFullnodeUrl("mainnet") }),
          testnet: new SuiClient({ url: getFullnodeUrl("testnet") }),
          devnet: new SuiClient({ url: getFullnodeUrl("devnet") }),
        }}
        defaultNetwork="mainnet"
      >
        <WalletProvider>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
} 