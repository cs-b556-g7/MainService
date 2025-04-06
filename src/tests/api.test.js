import request from 'supertest';
import app from '../index.js';


describe('GET /users', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /profiles', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/profiles');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /venues', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/venues');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /venue-sports', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/venue-sports');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /events', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/events');
    expect(response.statusCode).toBe(200);
  });
});
