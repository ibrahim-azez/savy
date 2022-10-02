import 'reflect-metadata';
import 'es6-shim';
import { logger } from '@core';
import { routes } from './routes';
import { myDataSource } from './app/core/utils/database';

process.on('uncaughtException', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

const port = process.env.port || 3333;

/**
 *  ----------------- DATABASE CONNECTION SETUP THEN RUN THE SERVER -------------------
 */
myDataSource
  .initialize()
  .then(() => {
    logger.info('Data Source has been initialized!');

    const server = routes.listen(port, () => {
      logger.info(`Listening at http://localhost:${port}`);
    });
    server.on('error', logger.error);

    process.on('unhandledRejection', (err: any) => {
      logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
      logger.error(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    logger.error('Error during Data Source initialization:', err);
  });
