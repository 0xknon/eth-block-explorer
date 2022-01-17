import Web3 from 'web3'
import config from 'src/config'
import logger from 'src/utils/logger'

const ethWsProvider = config.get('server.web3.eth.provider.websocket')

const web3 = new Web3(new Web3.providers.WebsocketProvider(ethWsProvider))

const subscribeEthBlocks = () => {
  web3.eth.subscribe('newBlockHeaders', (err, result) => {
    if (err) {
      logger.error(err)
      return
    }

    logger.info(result)

  })
}

export default {
  subscribeEthBlocks
}