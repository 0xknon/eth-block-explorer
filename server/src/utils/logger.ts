import pino from 'pino';

const logger = pino({
  serializers: {
    err: pino.stdSerializers.err,
  },
});

export default logger;
