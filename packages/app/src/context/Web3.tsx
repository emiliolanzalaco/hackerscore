'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { State, WagmiProvider, createConfig } from 'wagmi'
import { RPC_URL, WALLETCONNECT_PROJECT_ID } from '../config'
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { baseSepolia } from 'viem/chains'
import { createClient, createPublicClient, http } from 'viem'

interface Props extends PropsWithChildren {
  initialState?: State
}

const queryClient = new QueryClient()
const config = createConfig({
  chains: [baseSepolia],
  client({ chain }) {
    return createClient({ chain, transport: http(RPC_URL) })
  },
})

export function Web3Provider(props: Props) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicContextProvider
            theme='dark'
            settings={{
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
