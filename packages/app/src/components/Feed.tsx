'use client'
import '../styles/feed.css'
import { gql, useQuery } from '@apollo/client'
type Attestation = {
  __typename: string
  id: string
  decodedDataJson: string
  recipient: string
  attester: string
  timeCreated: number
  txid: string
  schemaId: string
}

const data = [
  {
    name: 'score',
    type: 'uint256',
    signature: 'uint256 score',
    value: { name: 'score', type: 'uint256', value: { type: 'BigNumber', hex: '0x0a' } },
  },
  {
    name: 'description',
    type: 'string',
    signature: 'string description',
    value: {
      name: 'description',
      type: 'string',
      value: 'White hat hacker found and patched an exploit worth $100 million.',
    },
  },
]

function extractScore(dataArray: string) {
  const newDataArray: any[] = JSON.parse(dataArray)
  const scoreObj = newDataArray.find((item) => item.name === 'score')
  return Number(scoreObj.value.value.hex) // Assuming the score will always be a BigNumber object
}

function extractDescription(dataArray: string) {
  const newDataArray: any[] = JSON.parse(dataArray)
  const descriptionObj = newDataArray.find((item) => item.name === 'description')
  if (!descriptionObj || !descriptionObj.value) {
    return null // or a default description if not found
  }
  return descriptionObj.value.value // Directly returning the description string
}

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
  const { data } = useQuery(ATTESTATIONS_QUERY, {
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
  }) as { data: { attestations: Attestation[] } }

  if (!data) return <div>Loading...</div>
  if (data.attestations.length === 0) return <div>No attestations found</div>

  console.log(data.attestations[0].decodedDataJson)
  return (
    <div className='container'>
      <div className='feed-container'>
        {data.attestations.map((attestation) => (
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h3 className='panel-title'>
                {new Date(attestation.timeCreated * 1000).toDateString()} - {attestation.attester}
              </h3>
            </div>
            <div className='panel-body'>
              <p>
                <strong>About:</strong> {attestation.recipient}
              </p>
              <p>
                <strong>X Factor:</strong> {extractScore(attestation.decodedDataJson)}
              </p>
              <p>
                <strong>Description:</strong> {extractDescription(attestation.decodedDataJson)}
              </p>
            </div>
            <div className='panel-footer'>
              <strong>Transaction:</strong>{' '}
              <a href={`https://sepolia.basescan.org/tx/${attestation.txid}`} className='post-link'>
                View Transaction
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
