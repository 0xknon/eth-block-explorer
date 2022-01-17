import { Transaction } from 'web3-core'

type Block = {
  blockNumber: number,
  mixHash?: string,
  timestamp?: string | number,
  baseFeePerGas?: number,
  difficulty?:  number,
  parentHash:  string,
  extraData:  string,
  gasLimit: number,
  gasUsed:  number,
  hash:  string,
  logsBloom:  string,
  miner:  string,
  nonce:  string,
  receiptsRoot:  string,
  sha3Uncles:  string,
  size?: number,
  stateRoot:  string,
  transactionsRoot?:  string,
  transactions: Transaction[]
}

export { Block }