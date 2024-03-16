import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useAccount } from 'wagmi'
import {Address} from 'viem'
function truncate (address: Address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function ConnectWallet() {
  const { setShowAuthFlow } = useDynamicContext()
  const { address } = useAccount()
  return (
    <>
      {address ? (
        <button className='btn btn-md btn-primary'>{truncate(address)}</button>
      ) : (
        <button className='btn btn-md btn-primary' onClick={() => setShowAuthFlow(true)}>
          login
        </button>
      )}
    </>
  )
}
