import express from 'express'
import pino from 'pino';
import pinoHttp from 'pino-http';
import redis from 'redis';
import dotenv from 'dotenv';
import { dbConnection } from './databse/dbConnection.js';

dotenv.config();

const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379
// });

const app = express();
app.use(pinoHttp({ logger }));
app.use(express.json());

dbConnection(logger);

const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))