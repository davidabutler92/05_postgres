const pool = require('../utils/pool');

module.exports = class Car {
  id;
  color;
  make;

  constructor(row) {
    this.id = row.id;
    this.color = row.color;
    this.make = row.make;
  }

  static async insert({ color, make }) {
    const { rows } = await pool.query(
      'INSERT INTO animals (color, make) VALUES ($1, $2) RETURNING *',
      [color, make]
    );
    return new Car(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM cars');

    return rows.map(row => new Car(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM cars WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw new Error(`No car with id ${id}`);
    return new Car(rows[0]);
  }

  static async update(id, { color, make }) {
    const { rows } = await pool.query(
      'UPDATE cars SET color=$1, make=$2 WHERE id=$3 RETURNING *',
      [color, make, id]
    );

    if(!rows[0]) throw new Error(`No car with id ${id}`);
    return new Car(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM cars WHERE id=$1 RETURNING *',
      [id]
    );

    return new Car(rows[0]);
  }
  
};
