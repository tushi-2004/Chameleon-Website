const request = require('supertest');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Chameleon Website API',
    timestamp: new Date().toISOString()
  });
});

describe('Health Check API Tests', () => {
  test('Valid input: GET /health should return status OK', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.service).toBe('Chameleon Website API');
  });

  test('Edge case: GET /health should return a timestamp value', async () => {
    const response = await request(app).get('/health');

    expect(response.body.timestamp).toBeDefined();
    expect(new Date(response.body.timestamp).toString()).not.toBe('Invalid Date');
  });

  test('Invalid input: unknown route should return 404', async () => {
    const response = await request(app).get('/invalid-route');

    expect(response.statusCode).toBe(404);
  });
});