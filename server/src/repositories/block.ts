import dayjs from 'dayjs'
import { Blocks } from 'src/models'
import { Block } from 'src/interfaces'

const create = async (payload: Block): Promise<Block> => {
  return Blocks.create(payload);
}

const getBlockSummary = async (start: Date, end: Date): Promise<{
  totalBlock: number,
  gasUsed: number
}> => {
  const docs = await Blocks.aggregate([
    {
      $match: {
        timestamp: {
          $gte: start, 
          $lt: end
        }
      }
    },
    {
      $group: {
        _id: 1,
        totalBlock: {
          $max: "$blockNumber"
        },
        gasUsed: {
          $sum: "$gasUsed"
        }
      }
    }
  ])

  return docs[0]
}

export default {
  create,
  getBlockSummary
}

