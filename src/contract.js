import Web3 from 'web3'

const ABI = [
  {
    constant: true,
    inputs: [],
    name: 'getBalance',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'id',
        type: 'string'
      }
    ],
    name: 'setDone',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'id',
        type: 'string'
      }
    ],
    name: 'withdrawFreelancer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'id',
        type: 'string'
      }
    ],
    name: 'withdrawClient',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'id',
        type: 'string'
      }
    ],
    name: 'getMilestone',
    outputs: [
      {
        name: '',
        type: 'address'
      },
      {
        name: '',
        type: 'address'
      },
      {
        name: '',
        type: 'uint256'
      },
      {
        name: '',
        type: 'string'
      },
      {
        name: '',
        type: 'uint256'
      },
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'id',
        type: 'string'
      },
      {
        name: 'description',
        type: 'string'
      },
      {
        name: 'timestamp',
        type: 'uint256'
      },
      {
        name: 'isClient',
        type: 'bool'
      }
    ],
    name: 'createMilestone',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  }
]

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:3000')

export const getWallet = async () => {
  const wallets = await web3.eth.getAccounts()
  return wallets[0]
}

const contract = new web3.eth.Contract(
  ABI,
  '0x3ebac9879739cd2ad046942bb153b397adb827a9'
)

export const createMilestone = async (proposal, isClient) => {
  const wallet = await getWallet()

  const date = new Date(proposal.deadline).getTime()

  return contract.methods
    .createMilestone(proposal.id, proposal.requirement, date, isClient)
    .send({
      from: wallet,
      ...(isClient && {
        value: web3.utils.toWei('32', 'milli')
      })
    })
}

export const setDone = async id => {
  const wallet = await getWallet()
  contract.methods
    .setDone(id)
    .send({ from: wallet })
    .then(console.log)
}
