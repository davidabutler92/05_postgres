DROP TABLE IF EXISTS animals;

CREATE TABLE animals (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  color TEXT NOT NULL,
  type TEXT NOT NULL
);