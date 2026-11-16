const test = require('node:test');
const assert = require('node:assert');
const { app } = require('../app');

test('GET /health trả về status ok', async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.on('listening', resolve));
  const port = server.address().port;

  try {
    const res = await fetch(`http://127.0.0.1:${port}/health`);
    const body = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.status, 'ok');
  } finally {
    server.close();
  }
});
