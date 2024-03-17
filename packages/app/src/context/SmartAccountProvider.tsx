import React, { createContext, useState, useEffect } from 'react'
import { usePublicClient, useWalletClient } from 'wagmi'
import { ENTRYPOINT_ADDRESS_V06, createSmartAccountClient, walletClientToSmartAccountSigner } from 'permissionless'
import { signerToSafeSmartAccount } from 'permissionless/accounts'
import { createPimlicoPaymasterClient } from 'permissionless/clients/pimlico'
import { http } from 'viem'
import { baseSepolia } from 'viem/chains'
import { RPC_URL } from '@/config'

export const SmartAccountContext = createContext<ReturnType<typeof createSmartAccountClient> | null>(null)

export const SmartAccountProvider = ({ children }: { children: React.ReactNode }) => {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const [smartAccountClient, setSmartAccountClient] = useState<ReturnType<typeof createSmartAccountClient> | null>(null)

  useEffect(() => {
    const setUp = async () => {
      if (!publicClient || !walletClient?.account) return
      console.log("RELOADING SMART ACCOUNT")
      const signer = walletClientToSmartAccountSigner(walletClient)
      const simpleSmartAccountClient = await signerToSafeSmartAccount(publicClient, {
        entryPoint: ENTRYPOINT_ADDRESS_V06,
        signer,
        safeVersion: '1.4.1',
      })

      const cloudPaymaster = createPimlicoPaymasterClient({
        chain: baseSepolia,
        transport: http(RPC_URL),
        entryPoint: ENTRYPOINT_ADDRESS_V06,
      })

      const newSmartAccountClient = createSmartAccountClient({
        account: simpleSmartAccountClient,
        entryPoint: ENTRYPOINT_ADDRESS_V06,
        chain: baseSepolia,
        bundlerTransport: http(RPC_URL),
        middleware: {
          sponsorUserOperation: cloudPaymaster.sponsorUserOperation,
        },
      })
      setSmartAccountClient(newSmartAccountClient as ReturnType<typeof createSmartAccountClient>)
    }

    setUp()
  }, [publicClient, walletClient])

  return <SmartAccountContext.Provider value={smartAccountClient}>{children}</SmartAccountContext.Provider>
}
