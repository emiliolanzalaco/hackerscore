'use client'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useSmartAccountClient } from '@/hooks/useSmartAccountClient'

function truncate(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function ConnectWallet() {
  const { setShowAuthFlow, handleLogOut, user } = useDynamicContext()
  const smartAccountClient = useSmartAccountClient()
  console.log(smartAccountClient)
  return (
    <>
      {user?.email ? (
        <button className='btn btn-md btn-primary' onClick={() => handleLogOut()}>
          {user.email}
        </button>
      ) : (
        <button className='btn btn-md btn-primary' onClick={() => setShowAuthFlow(true)}>
          login
        </button>
      )}
    </>
  )
}
