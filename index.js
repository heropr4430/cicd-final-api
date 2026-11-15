const express = require('express');
const redis = require('redis');

const app = express();
const port = process.env.PORT || 3000;

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`
});
redisClient.connect().catch(console.error);

app.get('/', (req, res) => {
  res.send('Hello updated!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/visits', async (req, res) => {
  const count = await redisClient.incr('visits');
  res.json({ visits: count });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API listening on port ${port}`);
});
