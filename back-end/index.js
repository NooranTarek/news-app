import express from 'express'
import pino from 'pino';
import pinoHttp from 'pino-http';
import redis from 'redis';
import dotenv from 'dotenv';
import { dbConnection } from './databse/dbConnection.js';
import userRouter from './src/modules/user/user.router.js';
import cors from 'cors';
import sourceRouter from './src/modules/source/source.router.js';

const app = express();
export const logger = pino({
  level:'info'
});
app.use(pinoHttp({ logger }));
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    };
app.use(cors());
dotenv.config();


// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379
// });

//_____________________________________________________________________________
app.use('/users',userRouter);
app.use('/sources',sourceRouter);

dbConnection(logger);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const response = {
    status: 'error',
    message: error.message || 'Internal Server Error',
  };
  logger.error(error);
  res.status(statusCode).json(response);
});
const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))