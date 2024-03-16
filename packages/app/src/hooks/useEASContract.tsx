import { EAS_ABI } from '@/abis'
import { getContract } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

export function useEASContract() {
  const publicClient = usePublicClient()
  const {data: walletClient} = useWalletClient()

  if (!publicClient || !walletClient) return
  const easContract = getContract({
    abi: EAS_ABI,
    address: '0x4200000000000000000000000000000000000021',
    client: { public: publicClient, wallet: walletClient },
  })

  return easContract
}
