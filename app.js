const express = require('express');
const redis = require('redis');

const app = express();

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`
});

app.get('/', (req, res) => {
  res.send('Hello from VPS!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: process.env.APP_VERSION || 'dev' });
});

app.get('/visits', async (req, res) => {
  const count = await redisClient.incr('visits');
  res.json({ visits: count });
});

module.exports = { app, redisClient };
