const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Authentification', () => {
  beforeAll(async () => {
    await User.sync({ force: true });
    await User.create({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('devrait connecter un utilisateur', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('devrait rafraîchir le token', async () => {
    // Première connexion pour obtenir les cookies
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    
    const cookies = loginRes.headers['set-cookie'];
    
    const refreshRes = await request(app)
      .post('/auth/refresh')
      .set('Cookie', cookies);
    
    expect(refreshRes.statusCode).toEqual(200);
    expect(refreshRes.headers['set-cookie']).toBeDefined();
  });

  it('devrait déconnecter un utilisateur', async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    
    const cookies = loginRes.headers['set-cookie'];
    
    const logoutRes = await request(app)
      .post('/auth/logout')
      .set('Cookie', cookies);
    
    expect(logoutRes.statusCode).toEqual(200);
  });
});