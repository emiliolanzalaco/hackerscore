'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { State, WagmiProvider } from 'wagmi'
import { WALLETCONNECT_CONFIG, WALLETCONNECT_PROJECT_ID } from '@/utils/web3'
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'

interface Props extends PropsWithChildren {
  initialState?: State
}

const queryClient = new QueryClient()

createWeb3Modal({
  wagmiConfig: WALLETCONNECT_CONFIG,
  projectId: WALLETCONNECT_PROJECT_ID,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
})

const cssOverrides = `
.wallet-list-item__tile:hover > img {
  animation: rotate 1s forwards;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`
export function Web3Provider(props: Props) {
  return (
    <>
      <WagmiProvider config={WALLETCONNECT_CONFIG} initialState={props.initialState}>
        <QueryClientProvider client={queryClient}>
          <DynamicContextProvider
            theme='dark'
            settings={{
              cssOverrides,
              // Find your environment id at https://app.dynamic.xyz/dashboard/developer
              environmentId: '9156e906-9a36-4a2d-ab8c-7b585506f0cb',
              walletConnectors: [EthereumWalletConnectors],
            }}>
            <DynamicWagmiConnector>{props.children}</DynamicWagmiConnector>
          </DynamicContextProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
