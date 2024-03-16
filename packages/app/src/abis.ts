export const EAS_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address', indexed: true },
      { internalType: 'address', name: 'attester', type: 'address', indexed: true },
      { internalType: 'bytes32', name: 'uid', type: 'bytes32', indexed: false },
      { internalType: 'bytes32', name: 'schemaUID', type: 'bytes32', indexed: true },
    ],
    type: 'event',
    name: 'Attested',
    anonymous: false,
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address', indexed: true },
      { internalType: 'address', name: 'attester', type: 'address', indexed: true },
      { internalType: 'bytes32', name: 'uid', type: 'bytes32', indexed: false },
      { internalType: 'bytes32', name: 'schemaUID', type: 'bytes32', indexed: true },
    ],
    type: 'event',
    name: 'Revoked',
    anonymous: false,
  },
  {
    inputs: [
      { internalType: 'address', name: 'revoker', type: 'address', indexed: true },
      { internalType: 'bytes32', name: 'data', type: 'bytes32', indexed: true },
      { internalType: 'uint64', name: 'timestamp', type: 'uint64', indexed: true },
    ],
    type: 'event',
    name: 'RevokedOffchain',
    anonymous: false,
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'data', type: 'bytes32', indexed: true },
      { internalType: 'uint64', name: 'timestamp', type: 'uint64', indexed: true },
    ],
    type: 'event',
    name: 'Timestamped',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'struct AttestationRequest',
        name: 'request',
        type: 'tuple',
        components: [
          { internalType: 'bytes32', name: 'schema', type: 'bytes32' },
          {
            internalType: 'struct AttestationRequestData',
            name: 'data',
            type: 'tuple',
            components: [
              { internalType: 'address', name: 'recipient', type: 'address' },
              { internalType: 'uint64', name: 'expirationTime', type: 'uint64' },
              { internalType: 'bool', name: 'revocable', type: 'bool' },
              { internalType: 'bytes32', name: 'refUID', type: 'bytes32' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'attest',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
  },
  {
    inputs: [
      {
        internalType: 'struct DelegatedAttestationRequest',
        name: 'delegatedRequest',
        type: 'tuple',
        components: [
          { internalType: 'bytes32', name: 'schema', type: 'bytes32' },
          {
            internalType: 'struct AttestationRequestData',
            name: 'data',
            type: 'tuple',
            components: [
              { internalType: 'address', name: 'recipient', type: 'address' },
              { internalType: 'uint64', name: 'expirationTime', type: 'uint64' },
              { internalType: 'bool', name: 'revocable', type: 'bool' },
              { internalType: 'bytes32', name: 'refUID', type: 'bytes32' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
          },
          {
            internalType: 'struct Signature',
            name: 'signature',
            type: 'tuple',
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
            ],
          },
          { internalType: 'address', name: 'attester', type: 'address' },
          { internalType: 'uint64', name: 'deadline', type: 'uint64' },
        ],
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'attestByDelegation',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'uid', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
    name: 'getAttestation',
    outputs: [
      {
        internalType: 'struct Attestation',
        name: '',
        type: 'tuple',
        components: [
          { internalType: 'bytes32', name: 'uid', type: 'bytes32' },
          { internalType: 'bytes32', name: 'schema', type: 'bytes32' },
          { internalType: 'uint64', name: 'time', type: 'uint64' },
          { internalType: 'uint64', name: 'expirationTime', type: 'uint64' },
          { internalType: 'uint64', name: 'revocationTime', type: 'uint64' },
          { internalType: 'bytes32', name: 'refUID', type: 'bytes32' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'address', name: 'attester', type: 'address' },
          { internalType: 'bool', name: 'revocable', type: 'bool' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
        ],
      },
    ],
  },
  {
    inputs: [
      { internalType: 'address', name: 'revoker', type: 'address' },
      { internalType: 'bytes32', name: 'data', type: 'bytes32' },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'getRevokeOffchain',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'getSchemaRegistry',
    outputs: [{ internalType: 'contract ISchemaRegistry', name: '', type: 'address' }],
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'data', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
    name: 'getTimestamp',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'uid', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
    name: 'isAttestationValid',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
  },
  {
    inputs: [
      {
        internalType: 'struct MultiAttestationRequest[]',
        name: 'multiRequests',
        type: 'tuple[]',
        components: [
          { internalType: 'bytes32', name: 'schema', type: 'bytes32' },
          {
            internalType: 'struct AttestationRequestData[]',
            name: 'data',
            type: 'tuple[]',
            components: [
              { internalType: 'address', name: 'recipient', type: 'address' },
              { internalType: 'uint64', name: 'expirationTime', type: 'uint64' },
              { internalType: 'bool', name: 'revocable', type: 'bool' },
              { internalType: 'bytes32', name: 'refUID', type: 'bytes32' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'multiAttest',
    outputs: [{ internalType: 'bytes32[]', name: '', type: 'bytes32[]' }],
  },
  {
    inputs: [
      {
        internalType: 'struct MultiDelegatedAttestationRequest[]',
        name: 'multiDelegatedRequests',
        type: 'tuple[]',
        components: [
          { internalType: 'bytes32', name: 'schema', type: 'bytes32' },
          {
            internalType: 'struct AttestationRequestData[]',
            name: 'data',
            type: 'tuple[]',
            components: [
              { internalType: 'address', name: 'recipient', type: 'address' },
              { internalType: 'uint64', name: 'expirationTime', type: 'uint64' },
              { internalType: 'bool', name: 'revocable', type: 'bool' },
              { internalType: 'bytes32', name: 'refUID', type: 'bytes32' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
          },
          {
            internalType: 'struct Signature[]',
            name: 'signatures',
            type: 'tuple[]',
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
            ],
          },
          { internalType: 'address', name: 'attester', type: 'address' },
          { internalType: 'uint64', name: 'deadline', type: 'uint64' },
        ],
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'multiAttestByDelegation',
    outputs: [{ internalType: 'bytes32[]', name: '', type: 'bytes32[]' }],
  },
  {
    inputs: [
      {
        internalType: 'struct MultiRevocationRequest[]',
        name: 'multiRequests',
        type: 'tuple[]',
        components: [
          { internalType: 'bytes32', name: 'schema', type: 'bytes32' },
          {
            internalType: 'struct RevocationRequestData[]',
            name: 'data',
            type: 'tuple[]',
            components: [
              { internalType: 'bytes32', name: 'uid', type: 'bytes32' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'multiRevoke',
  },
  {
    inputs: [
      {
        internalType: 'struct MultiDelegatedRevocationRequest[]',
        name: 'multiDelegatedRequests',
        type: 'tuple[]',
        components: [
          { internalType: 'bytes32', name: 'schema', type: 'bytes32' },
          {
            internalType: 'struct RevocationRequestData[]',
            name: 'data',
            type: 'tuple[]',
            components: [
              { internalType: 'bytes32', name: 'uid', type: 'bytes32' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
          },
          {
            internalType: 'struct Signature[]',
            name: 'signatures',
            type: 'tuple[]',
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
            ],
          },
          { internalType: 'address', name: 'revoker', type: 'address' },
          { internalType: 'uint64', name: 'deadline', type: 'uint64' },
        ],
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'multiRevokeByDelegation',
  },
  {
    inputs: [{ internalType: 'bytes32[]', name: 'data', type: 'bytes32[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'multiRevokeOffchain',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
  },
  {
    inputs: [{ internalType: 'bytes32[]', name: 'data', type: 'bytes32[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'multiTimestamp',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
  },
  {
    inputs: [
      {
        internalType: 'struct RevocationRequest',
        name: 'request',
        type: 'tuple',
        components: [
          { internalType: 'bytes32', name: 'schema', type: 'bytes32' },
          {
            internalType: 'struct RevocationRequestData',
            name: 'data',
            type: 'tuple',
            components: [
              { internalType: 'bytes32', name: 'uid', type: 'bytes32' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'revoke',
  },
  {
    inputs: [
      {
        internalType: 'struct DelegatedRevocationRequest',
        name: 'delegatedRequest',
        type: 'tuple',
        components: [
          { internalType: 'bytes32', name: 'schema', type: 'bytes32' },
          {
            internalType: 'struct RevocationRequestData',
            name: 'data',
            type: 'tuple',
            components: [
              { internalType: 'bytes32', name: 'uid', type: 'bytes32' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
          },
          {
            internalType: 'struct Signature',
            name: 'signature',
            type: 'tuple',
            components: [
              { internalType: 'uint8', name: 'v', type: 'uint8' },
              { internalType: 'bytes32', name: 'r', type: 'bytes32' },
              { internalType: 'bytes32', name: 's', type: 'bytes32' },
            ],
          },
          { internalType: 'address', name: 'revoker', type: 'address' },
          { internalType: 'uint64', name: 'deadline', type: 'uint64' },
        ],
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'revokeByDelegation',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'data', type: 'bytes32' }],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'revokeOffchain',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'data', type: 'bytes32' }],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'timestamp',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
  },
] as const
