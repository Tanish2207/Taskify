const request = require('supertest');
const app = require('../index');

describe('API End-to-End', () => {
  it('GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('From app.get');
  });
});
