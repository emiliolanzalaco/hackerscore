'use client'
import { SmartAccountContext } from "@/context/SmartAccountProvider"
import {useContext} from "react"

export const useSmartAccountClient = () => {
  const smartAccountClient = useContext(SmartAccountContext)
  console.log(smartAccountClient)
  return smartAccountClient
}