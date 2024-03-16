'use client'
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import { useState } from 'react'
import { useAccount } from 'wagmi'

export function ConnectWorldCoin() {
  const [proof, setProof] = useState<ISuccessResult | null>(null)

  const { address } = useAccount()
  // if (!address) {
  //   alert('Please connect your wallet')
  //   return
  // }
  return <button className='btn btn-md btn-primary'>connect worldcoin</button>
}
