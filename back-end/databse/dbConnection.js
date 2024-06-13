import mongoose from 'mongoose';

export function dbConnection(logger) {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DB_ONLINE)
    .then(() => {
      logger.info("Database connection established successfully");
    })
    .catch((err) => {
      logger.error("Database connection failed", err);
    });

//   redisClient.on('connect', () => {
//     logger.info('Redis connected');
//   });

//   redisClient.on('error', (err) => {
//     logger.error('Redis error', err);
//   });
}
