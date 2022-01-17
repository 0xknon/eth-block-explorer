import dayjs from 'dayjs'
import BlockRepo from 'src/repositories/block'
import BlockSummaryRepo from 'src/repositories/blockSummary'

const fetchSummaries = async () => {
  return BlockSummaryRepo.getSummaries()
}

const addSummaryByDate = async (date: Date) => {

  const start = dayjs(date).set('hour', 0).set('minute', 0).set('second', 0)
  const end = dayjs(start).add(1, 'day')
  const { gasUsed, totalBlock } = await BlockRepo.getBlockSummary(start.toDate(), end.toDate())

  const timestamp = start.unix()
  await BlockSummaryRepo.addSummary(timestamp, totalBlock, gasUsed)
  return { gasUsed, totalBlock }
}

export default {
  fetchSummaries,
  addSummaryByDate
}