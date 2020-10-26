const request = require('supertest');
const db = require('../database/db-config.js');
const server = require('../api/server.js');

describe('GET /api/users/:id/campaigns', () => {
  it('should return data', async () => {
    const res = await request(server).get('/api/users/:id/campaigns');

    expect(res.body).toBe(res.body);
  });

  it('should return 401 status if user is unauthorized', async () => {
    const response = await request(server).get('/api/users/1/campaigns');

    expect(response.status).toBe(401);
  });

  beforeEach(async () => {
    await db('users').truncate();
  });
});

// describe('POST /api/users/:id/campaigns', () => {})

// describe('UPDATE /api/users/:id/campaigns', () => {})

// describe('DELETE /api/users/:id/campaigns', () => {})

// describe('POST /api/users/:id/campaigns/:campaign_id/predictions', () => {})
