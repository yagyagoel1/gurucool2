import { createClient } from 'redis';
import MockRedisClient from '../../__mocks__/redisClient.js';
const isTest = process.env.NODE_ENV === 'test';




const redisClient = isTest ? MockRedisClient: createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});
if(!isTest)
{
    redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();
}
export default redisClient;