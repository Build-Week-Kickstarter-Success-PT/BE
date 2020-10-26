const request = require('supertest');
const db = require('../database/db-config.js');
const server = require('../api/server.js');

describe('POST /api/auth/register', () => {
  it('should return 201 on successful register', async () => {
    beforeEach(async () => {
      await db('users').truncate();
    });
    const res = await request(server)
      .post('/api/auth/register')
      .send({ name: 'user', email: 'user@test.com', password: 'password' });

    expect(res.status).toBe(201);
  });

  it('should return new user created', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ name: 'user', email: 'user@test.com', password: 'password' });

    expect(res.body).toMatchObject({
      auth: {
        name: 'user',
        email: 'user@test.com',
      },
    });
  });

  it('should return 400 if missing name, email or password', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ name: '', email: '', password: '' });

    expect(res.status).toBe(400);
  });

  it('should return 400 if exists', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ name: 'user', email: 'user@test.com', password: 'password' });

    expect(res.status).toBe(201);

    const user = await request(server)
      .post('/api/auth/register')
      .send({ name: 'user', email: 'user@test.com', password: 'password' });

    expect(user.status).toBe(400);
    expect(user.body).toMatchObject({
      message: 'user already exists, please log in!',
    });
  });
});

describe('POST /api/auth/login', () => {
  // it('should return 200 on successful login', async () => {
  //   const res = await request(server)
  //     .post('/api/auth/login')
  //     .send({ email: 'test@email.com', password: 'password' });

  //   expect(res.status).toBe(200);
  // });

  // it('should return a message with a welcome message and an auth token', async () => {
  //   const res = await request(server)
  //     .post('/api/auth/login')
  //     .send({ email: 'user@test.com', password: 'password' });

  //   expect(res.body).toMatchObject({
  //     message: 'Welcome to the api',
  //     auth: { id: 1, name: 'John Doe', email: 'user@test.com' },
  //     token: expect.any(String),
  //   });
  // });

  it('should return 401 if cant find user', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: 'user@test.com', password: 'password' });

    expect(res.status).toBe(401);
  });

  it('should return 400 if email or password is missing', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: '', password: 'password' });

    expect(res.status).toBe(400);
  });
});
