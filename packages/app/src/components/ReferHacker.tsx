import { useEASContract } from '@/hooks/useEASContract'
import { useState } from 'react'

export default function ReferHacker({ profile }: { profile: string }) {
  const [xFactor, setXFactor] = useState(0)
  const eas = useEASContract()

  return (
    <div className='container'>
      <h1>Attest {profile}</h1>
      <form>
        <div className='form-group'>
          <label>X Factor</label>
          <input type='number' className='form-control' id='score' placeholder='Enter X Factor (-10 to 10)'/>
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea className='form-control' id='description' placeholder='Enter description'></textarea>
        </div>
        <button type='submit' className='btn btn-primary'>
          Attest
        </button>
      </form>
    </div>
  )
}
