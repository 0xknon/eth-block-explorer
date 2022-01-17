
import { promisify } from 'util'
import { BlockSummaryContract, serverAccount } from 'src/utils/web3'

const getSummaries = async () => {
  // console.log(await BlockSummaryContract.methods.summaries(0).call())
  return BlockSummaryContract.methods.getSummaries().call()
}

const addSummary = async (timestamp: number, totalNumOfBlocks: number, totalGasSpent: number) => {
  console.log(timestamp, totalNumOfBlocks, totalGasSpent)

  // const result = 
  //   await BlockSummaryContract.methods.addSummary(timestamp, totalNumOfBlocks, totalGasSpent).call({ from: serverAccount.address })

  // console.log('result', result)
  return BlockSummaryContract.methods.addSummary(timestamp, totalNumOfBlocks, totalGasSpent).send({ from: serverAccount.address })

  // return BlockSummaryContract.methods.addSummary(timestamp, totalNumOfBlocks, totalGasSpent)
  //   .call({ from: serverAccount.address })
  //   .then((result: any) => {
  //     console.log('result', result)
  //   })
  //   .catch((error: any) => {
  //     console.log('error', error)
  //   })
  // return promisify((cb) => BlockSummaryContract.methods.addSummary(timestamp, totalNumOfBlocks, totalGasSpent, cb))()
}

export default {
  getSummaries,
  addSummary
}