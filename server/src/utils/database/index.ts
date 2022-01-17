import mongoose from 'mongoose';
import config from 'src/config';

const connectMongoDB = async (): Promise<typeof mongoose> => {
  const url = config.get('server.database.mongodb');
  if (config.get('env') === 'local') {
    mongoose.set('debug', true);
  }

  return mongoose.connect(url, {
    autoIndex: true,
  });
};

export { connectMongoDB };
