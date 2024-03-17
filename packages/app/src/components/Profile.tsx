import '../styles/profile.css'
import zoltar from '../../public/zoltarPortrait.png'
import Image from 'next/image'

export function Profile({ ensOrAddress }: { ensOrAddress: string }) {
  return (
    <div className='container'>
      <div className='jumbotron'>
        <Image src={zoltar} alt='Profile Photo' className='profile-photo' />
        <h2>@emiliolanzalaco</h2>
        <p style={{ fontSize: '4rem' }}>
          <span style={{ color: '#0f0', fontSize: '4rem' }}>10X </span>Hacker
        </p>
      </div>

      <div className='feed'>
        <h3 className='text-center'>References</h3>
        <div className='feed-item'>
          <p>
            <strong>@ebay</strong> attests that @emiliolanzalaco works for eBay.
          </p>
        </div>
        <div className='feed-item'>
          <p>
            <strong>@ETHGlobal</strong> attests that @emiliolanzalaco won the ETHLondon hackathon.
          </p>
        </div>
      </div>
    </div>
  )
}
