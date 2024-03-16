import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useAccount, useClient } from 'wagmi'
import { Address } from 'viem'
import { ENTRYPOINT_ADDRESS_V06, createSmartAccountClient, walletClientToSmartAccountSigner } from 'permissionless'
import { signerToSafeSmartAccount } from 'permissionless/accounts'
import { createPimlicoBundlerClient, createPimlicoPaymasterClient } from 'permissionless/clients/pimlico'
import { createPublicClient, getContract, http, parseEther } from 'viem'
import { baseSepolia, sepolia } from 'viem/chains'
import { useWalletClient } from 'wagmi'
import { RPC_URL } from '@/config'

function truncate(address: Address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function ConnectWallet() {
  const { data: walletClient } = useWalletClient()
  const publicClient = createPublicClient({
    transport: http(RPC_URL),
  })

  async function setUp() {
    const signer = walletClientToSmartAccountSigner(walletClient!)

    const simpleSmartAccountClient = await signerToSafeSmartAccount(publicClient, {
      entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      signer,
      safeVersion: '1.4.1',
    })

    const cloudPaymaster = createPimlicoPaymasterClient({
      chain: baseSepolia,
      transport: http(RPC_URL),
      entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    })

    const smartAccountClient = createSmartAccountClient({
      ///@ts-ignore-next-line
      account: simpleSmartAccountClient,  
      chain: baseSepolia,
      transport: http(RPC_URL),
      sponsorUserOperation: cloudPaymaster.sponsorUserOperation, // if using a paymaster
    })
  }

  const { setShowAuthFlow, handleLogOut } = useDynamicContext()
  const { address } = useAccount()
  return (
    <>
      {address ? (
        <button className='btn btn-md btn-primary' onClick={() => handleLogOut()}>
          {truncate(address)}
        </button>
      ) : (
        <button className='btn btn-md btn-primary' onClick={() => setShowAuthFlow(true)}>
          login
        </button>
      )}
    </>
  )
}
