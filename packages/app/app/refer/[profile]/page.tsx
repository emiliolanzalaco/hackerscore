'use client'
import ReferHacker from '@/components/ReferHacker'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { profile: string } }) {
  const router = useRouter()
  return <ReferHacker profile={params.profile}/>
}
