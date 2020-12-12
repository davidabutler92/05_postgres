const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', (req, res, next) => {
    Animal
      .insert(req.body)
      .then(animal => res.send(animal))
      .catch(next);
  });
