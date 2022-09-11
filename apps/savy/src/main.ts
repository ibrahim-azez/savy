/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import 'reflect-metadata';
import { app } from './app';
import { logger } from './app/core/utils/logger';
import { myDataSource } from './database';

process.on('uncaughtException', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

const port = process.env.port || 3333;

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    logger.info('Data Source has been initialized!');

    const server = app.listen(port, () => {
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
