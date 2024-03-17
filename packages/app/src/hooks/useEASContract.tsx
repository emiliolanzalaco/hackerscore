import { HACKER_SCORE_RESOLVER_ADDRESS } from '@/config'
import { EAS_ABI, HACKER_SCORE_RESOLVER_ABI } from '../abis'
import {
  Address,
  BaseError,
  ContractFunctionRevertedError,
  Hash,
  encodeAbiParameters,
  encodeFunctionData,
  getContract,
  zeroAddress,
  zeroHash,
} from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'
import { useSmartAccountClient } from './useSmartAccountClient'
import { baseSepolia } from 'viem/chains'


type HookReturnType = {
  attestXFactor(xFactor: number, description: string, recipient: Address): Promise<Hash>
  attestRegistration(nullifierHash: Hash): Promise<Hash>
}

export function useEASContract(): HookReturnType | undefined {
  const publicClient = usePublicClient()
  const smartAccountClient = useSmartAccountClient()

  if (!publicClient || !smartAccountClient) return
  const easContract = getContract({
    abi: EAS_ABI,
    address: '0x4200000000000000000000000000000000000021',
    client: { public: publicClient, wallet: smartAccountClient! },
  })

  const hackerScoreResolver = getContract({
    address: HACKER_SCORE_RESOLVER_ADDRESS,
    abi: HACKER_SCORE_RESOLVER_ABI,
    client: { public: publicClient, wallet: smartAccountClient! },
  })

  async function attestRegistration(nullifierHash: Hash) {
    const attestationData = encodeAbiParameters([{ type: 'bytes32', name: 'nullifierHash' }], [nullifierHash])

    let txHash: Hash = '0x'
    try {
      const functionData = encodeFunctionData({
        abi: EAS_ABI,
        functionName: 'attest',
        args: [
          {
            schema: await hackerScoreResolver.read.registrationSchemaUID(),
            data: {
              recipient: zeroAddress,
              expirationTime: 100710635709n,
              data: attestationData,
              refUID: zeroHash,
              value: 0n,
              revocable: true,
            },
          },
        ],
      })
      txHash = await smartAccountClient?.sendTransaction!({
        to: easContract.address,
        data: functionData,
        account: smartAccountClient.account!,
        chain: baseSepolia,
      })!
    } catch (e) {
      console.log(e)
    }
    console.log('txHash: ', txHash)
    return txHash
  }

  async function attestXFactor(xFactor: number, description: string, recipient: Address) {
    const attestationData = encodeAbiParameters([{ type: 'uint256', name: 'score' }, { type: 'string', name: 'description' }], [BigInt(xFactor), description])

    let txHash: Hash = '0x'
    try {
      txHash = await easContract.write.attest(
        [
          {
            schema: await hackerScoreResolver.read.hackerCredSchemaUID(),
            data: {
              recipient,
              expirationTime: BigInt('100710635709'),
              data: attestationData as Hash,
              refUID: zeroHash,
              value: BigInt(0),
              revocable: true,
            },
          },
        ],
        { account: smartAccountClient!.account!, chain: baseSepolia }
      )
    } catch (err) {
      console.log('err: ', err)
      if (err instanceof BaseError) {
        const revertError = err.walk((err) => err instanceof ContractFunctionRevertedError)
        if (revertError instanceof ContractFunctionRevertedError) {
          console.log('revertError: ', revertError)
          // do something with `errorName
        }
      }
    }
    console.log('txhash: ', txHash)
    return txHash
  }

  return { attestXFactor, attestRegistration }
}
