import { useEASContract } from '@/hooks/useEASContract'
import { useState } from 'react'
import { Address } from 'viem'

export default function ReferHacker({ profile }: { profile: Address }) {
  const [xFactor, setXFactor] = useState(0)
  const [description, setDescription] = useState('')
  const eas = useEASContract()

  let attestXFactor: (xFactor: number, description: string, recipient: Address) => Promise<`0x${string}`>

  if (eas) {
    attestXFactor = eas.attestXFactor
  } else {
    attestXFactor = async () => { throw new Error('EAS contract not loaded') }
  }

  return (
    <div className='container'>
      <h1>Attest {profile}</h1>
        <div className='form-group'>
          <label>X Factor</label>
          <input
            type='number'
            className='form-control'
            id='score'
            placeholder='Enter X Factor (-10 to 10)'
            onChange={(e) => setXFactor(Number(e.target.value))}
          />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea
            className='form-control'
            id='description'
            placeholder='Enter description'
            onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button className='btn btn-primary' onClick={() => attestXFactor(xFactor, description, profile) }>
          Attest
        </button>
    </div>
  )
}
