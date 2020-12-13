const app = require('../lib/app');
const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Animal = require('../lib/models/Animal');

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
      id: '1',
      color: 'red',
      type: 'mammal'
    });
  }); 
  
  it('shoud get all animals', async() => {
    const animals = await Promise.all([
      { color: 'brown', type: 'bear' },
      { color: 'blue', type: 'whale' },
      { color: 'red', type: 'snake' }
    ].map(animal => Animal.insert(animal)));

    const res = await request(app)
      .get('/api/v1/animals');
    
    expect(res.body).toEqual(expect.arrayContaining(animals));
    expect(res.body).toHaveLength(animals.length);
  });

  it('finds a animal by id', async() => {
    const animal = await Animal.insert({ color: 'red', type: 'bear' });

    const res = await request(app)
      .get(`/api/v1/animals/${animal.id}`);

    expect(res.body).toEqual(animal);
  });

  it('should update a animal using PUT', async() => {
    const animal = await Animal.insert({ color: 'brown', type: 'bear' });

    const res = await request(app)
      .put(`/api/v1/animals/${animal.id}`)
      .send({ color: 'brown', type: 'snake' });

    expect(res.body).toEqual({ 
      id: animal.id,
      color: 'brown',
      type: 'snake'
    });
  });

});
