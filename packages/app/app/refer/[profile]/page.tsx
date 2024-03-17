'use client'
import ReferHacker from '@/components/ReferHacker'
import { useRouter } from 'next/navigation'
import { Address } from 'viem'

export default function Page({ params }: { params: { profile: Address } }) {
  const router = useRouter()
  return <ReferHacker profile={params.profile}/>
}
