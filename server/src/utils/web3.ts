import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import config from 'src/config'

import { BLOCK_SUMMARY_JSON_INTERFACE } from 'src/constants'

const ethMainnetWsUrl = config.get('server.web3.eth.provider.websocket')
const ethLocalHttpUrl = config.get('server.web3.local.provider.http')
const accountPrivateKey = config.get('server.web3.local.account.privateKey')
const blockSummaryAddress = config.get('server.ethereum.dapp.blockSummary.address')
 
const web3Mainnet = new Web3(new Web3.providers.WebsocketProvider(ethMainnetWsUrl))
const web3Local = new Web3(ethLocalHttpUrl)

const BlockSummaryContract = new web3Local.eth.Contract(BLOCK_SUMMARY_JSON_INTERFACE as AbiItem[], blockSummaryAddress)
const serverAccount = web3Local.eth.accounts.privateKeyToAccount(accountPrivateKey)


export { web3Mainnet, web3Local, BlockSummaryContract, serverAccount }