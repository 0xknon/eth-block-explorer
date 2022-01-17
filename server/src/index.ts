import 'module-alias/register';
import express from 'express';
import config from 'src/config';
import logger from 'src/utils/logger';
import BlockService from 'src/services/block';
import { connectMongoDB } from 'src/utils/database';

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
  BlockService.subscribeEthBlocks()

  app.listen(port, () => {
    logger.info(`Listening on ${port}`);
  });

})();
