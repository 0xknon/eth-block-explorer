
import { promisify } from 'util'
import { BlockSummaryContract, serverAccount } from 'src/utils/web3'

const getSummaries = async () => {
  return BlockSummaryContract
    .methods
    .getSummaries()
    .call()
}

const addSummary = async (timestamp: number, totalNumOfBlocks: number, totalGasSpent: number) => {
  return BlockSummaryContract
    .methods
    .addSummary(timestamp, totalNumOfBlocks, totalGasSpent)
    .send({ from: serverAccount.address })
}

export default {
  getSummaries,
  addSummary
}