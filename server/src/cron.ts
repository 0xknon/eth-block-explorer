import 'module-alias/register';
import express from 'express';
import cron from 'node-cron';
import dayjs from 'dayjs';
import config from 'src/config';
import logger from 'src/utils/logger';
import { connectMongoDB } from 'src/utils/database';
import BlockSummaryService from 'src/services/blockSummary';

/**
 * Global Promise rejection & uncaught expection handler
 */
process.on('unhandledRejection', error => {
  console.log(error);
  logger.error('unhandledRejection', error);
});

export default (async () => {
  const app = express();

  const port = process.env.PORT || '3000';

  // Connect MongoDB
  await connectMongoDB();
  logger.info('connected MongoDB...');

  // Ref: https://github.com/node-cron/node-cron
  // The cron job triggers at 00:05:00 of everyday 
  cron.schedule('0 5 0 * * *', async () => {
    const yesterday = dayjs().subtract(1, 'day').toDate()

    const summary = await BlockSummaryService.addSummaryByDate(yesterday)
    logger.info({ summary })

    const summaries = await BlockSummaryService.fetchSummaries()
    logger.info({ summaries })
  })

  app.listen(port, () => {
    logger.info(`Listening on ${port}`);
  });

})();
