const pool = require('../utils/pool');

module.exports = class Animal {
  id;
  color;
  type;

  constructor(row) {
    this.id = row.id;
    this.color = row.color;
    this.type = row.type;
  }

  static async insert({ color, type }) {
    const { rows } = await pool.query(
      'INSERT INTO animals (color, type) VALUES ($1, $2) RETURNING *',
      [color, type]
    );
    return new Animal(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM animals');

    return rows.map(row => new Animal(row));
  }
  
};


