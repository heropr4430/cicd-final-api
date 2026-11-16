const { app, redisClient } = require('./app');

const port = process.env.PORT || 3000;

redisClient.connect().catch(console.error);

app.listen(port, '0.0.0.0', () => {
  console.log(`API listening on port ${port}`);
});
