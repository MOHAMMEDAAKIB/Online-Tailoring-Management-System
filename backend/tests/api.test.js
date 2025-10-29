const request = require('supertest');
const app = require('../server');

describe('API Health Check', () => {
  it('should return OK status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.body.status).toBe('OK');
  });
});

describe('Authentication Endpoints', () => {
  it('should reject login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      })
      .expect(401);
    
    expect(response.body.message).toBeDefined();
  });
});

describe('Protected Routes', () => {
  it('should reject access without token', async () => {
    const response = await request(app)
      .get('/api/measurements')
      .expect(401);
    
    expect(response.body.message).toContain('token');
  });
});
