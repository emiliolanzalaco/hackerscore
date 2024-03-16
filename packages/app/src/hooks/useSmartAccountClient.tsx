import { useState, useEffect } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { ENTRYPOINT_ADDRESS_V06, createSmartAccountClient, walletClientToSmartAccountSigner } from 'permissionless'
import { signerToSafeSmartAccount } from 'permissionless/accounts'
import { createPimlicoPaymasterClient } from 'permissionless/clients/pimlico'
import { http } from 'viem'
import { baseSepolia } from 'viem/chains'
import { RPC_URL } from '@/config'

export function useSmartAccountClient() {
  const account = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const [smartAccountClient, setSmartAccountClient] = useState<ReturnType<typeof createSmartAccountClient> | null>(null)

  async function setUp() {
    if (!walletClient?.account) return
    const signer = walletClientToSmartAccountSigner(walletClient!)

    const simpleSmartAccountClient = await signerToSafeSmartAccount(publicClient!, {
      entryPoint: ENTRYPOINT_ADDRESS_V06,
      signer,
      safeVersion: '1.4.1',
    })

    const cloudPaymaster = createPimlicoPaymasterClient({
      chain: baseSepolia,
      transport: http(RPC_URL),
      entryPoint: ENTRYPOINT_ADDRESS_V06,
    })

    const smartAccountClient = createSmartAccountClient({
      account: simpleSmartAccountClient,
      entryPoint: ENTRYPOINT_ADDRESS_V06,
      chain: baseSepolia,
      bundlerTransport: http(RPC_URL),
      middleware: {
        sponsorUserOperation: cloudPaymaster.sponsorUserOperation, // if using a paymaster
      }
    })

    setSmartAccountClient(smartAccountClient as ReturnType<typeof createSmartAccountClient>)
  }

  useEffect(() => {
    if (account.address) {
      setUp()
    }
  }, [account, walletClient, publicClient])

  return smartAccountClient
}