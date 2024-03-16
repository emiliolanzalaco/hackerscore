'use client'
import { useRouter } from 'next/navigation'

export default function Refer({ params }: { params: { profile: string } }) {
  const router = useRouter()
  return <div>Refer {params.profile}</div>
}
