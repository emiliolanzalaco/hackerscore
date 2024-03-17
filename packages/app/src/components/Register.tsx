'use client'
import { useEASContract } from '@/hooks/useEASContract'
import { useState } from 'react'
import { Hash } from 'viem'

export function Register() {
  const [nullifierHash, setNullifierHash] = useState<Hash>('0x')

  const eas = useEASContract()

  let register: (nullifierHash: Hash) => Promise<Hash>

  if (eas) {
    register = eas.attestRegistration
  } else {
    register = async () => {
      throw new Error('EAS contract not loaded')
    }
  }
  return (
    <div className='container'>
      <div className='jumbotron'>
        <h2>Register</h2>
        <form>
          <div className='form-group'>
            <label>Handle</label>
            <input type='text' className='form-control' id='handleInput' placeholder='Enter handle' />
          </div>
          <div className='form-group'>
            <label>Nullifier Hash</label>
            <input
              type='text'
              className='form-control'
              id='nullifierHashInput'
              placeholder='Enter nullifier hash'
              onChange={(e) => setNullifierHash(e.target.value as Hash)}
            />
          </div>
          <button
            className='btn btn-primary'
            onClick={(e) => {
              e.preventDefault()
              register(nullifierHash)
            }}>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
