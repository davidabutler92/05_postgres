const app = require('../lib/app');
const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('animals routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('should create a new animal using POST', async() => {
    const res = await request(app)
      .post('/api/v1/animals')
      .send({
        color: 'red',
        type: 'mammal'
      });

    expect(res.body).toEqual({
      color: 'red',
      type: 'mammal'
    });
  }); 
  
});
