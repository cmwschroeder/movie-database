DROP DATABASE IF EXISTS movie_db;
CREATE DATABASE movie_db;

use movie_db;

CREATE TABLE movies (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  movie_name VARCHAR(100)
);

CREATE TABLE reviews (
  id INT,
  movie_id INT,
  review TEXT NOT NULL,
  FOREIGN KEY (movie_id)
  REFERENCES movies(id)
  ON DELETE SET NULL
);