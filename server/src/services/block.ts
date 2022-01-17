
import logger from 'src/utils/logger'
import { web3Mainnet } from 'src/utils/web3'
import BlockRepo from 'src/repositories/block'

const fetchEthBlock = async (blockNumber: number) => {
  return web3Mainnet.eth.getBlock(blockNumber, true) 
}

const subscribeEthBlocks = () => {
  web3Mainnet.eth.subscribe('newBlockHeaders', async (err, result) => {
    if (err) {
      logger.error(err)
      return
    }

    const { number, ...block } = await fetchEthBlock(result.number)
 
    BlockRepo.create({
      ...block,
      blockNumber: number
    })
  })
}

export default {
  fetchEthBlock,
  subscribeEthBlocks
}