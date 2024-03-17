'use client'
import '../styles/feed.css'
import { gql, useQuery } from '@apollo/client'

const ATTESTATIONS_QUERY = gql`
  query Attestations($where: AttestationWhereInput, $orderBy: [AttestationOrderByWithRelationInput!]) {
    attestations(where: $where, orderBy: $orderBy) {
      id
      decodedDataJson
      recipient
      attester
      timeCreated
      txid
      schemaId
    }
  }
`
export function Feed() {
  const {data} = useQuery(ATTESTATIONS_QUERY, {
    variables: {
      where: {
        schemaId: {
          equals: '0x4dceabd87e6ed0f79ca973d46181c0fd346638e57a500b26f1a4616c3f1d81f9',
        },
      },
      orderBy: {
        timeCreated: 'desc',
      },
    },
  }) 
  console.log(data)
  return (  
    <div className='container'>
      <div className='feed-container'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>March 16, 2024, 10:00 AM - @user1</h3>
          </div>
          <div className='panel-body'>
            <p>
              <strong>About:</strong> @user2
            </p>
            <p>
              <strong>X Factor:</strong> 95
            </p>
            <p>
              <strong>Description:</strong> This is an example of a post in the feed. It contains a short description.
            </p>
          </div>
          <div className='panel-footer'>
            <strong>Transaction:</strong>{' '}
            <a href='#' className='post-link'>
              View Transaction
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
