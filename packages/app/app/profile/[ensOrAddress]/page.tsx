'use client'
import { useRouter } from "next/navigation"

export default function Profile({ params }: { params: { ensOrAddress: string } }) {
  const router = useRouter()
  return <div>Profile {params.ensOrAddress}</div>
}