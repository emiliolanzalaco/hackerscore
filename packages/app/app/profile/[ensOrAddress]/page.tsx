'use client'
import { useRouter } from "next/navigation"
import { Profile } from "@/components/Profile"
export default function Page({ params }: { params: { ensOrAddress: string } }) {
  const router = useRouter()
  return <Profile ensOrAddress={params.ensOrAddress}/>
}