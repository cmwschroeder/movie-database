const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to our database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movie_db'
  },
  console.log(`Connected to the movie_db database.`)
);

app.get('/api/movies', (req,res) => {
  db.query('SELECT * FROM movies', function(err, results){
    res.json(results);
  });
});

app.post('/api/add-movie', (req,res) => {
  const movie = req.body.movie;
  db.query(`INSERT INTO movies (movie_name) values ("${movie}")`, function(err, results){
    res.json('Movie added');
  });
});

app.get('/api/movies/reviews', (req,res) => {
  db.query('SELECT * FROM reviews', function(err, results){
    res.json(results);
  });
});

app.post('/api/add-review', (req, res) => {
  const {movie, review} = req.body;
  db.query(`SELECT id FROM movies WHERE movie_name = "${movie}"`, function(err, results) {
    db.query(`INSERT INTO reviews (movie_id, review) values (${results[0].id}, "${review}")`, function(err, results) {
      res.json("Review added");
    });
  });
});

app.post('/api/update-review', (req, res) => {
  const{id, review} = req.body;
  db.query(`UPDATE reviews SET review = "${review}" WHERE id = ${id}`, function(err, results) {
    res.json("Review updated");
  });
});

app.delete('/api/movie/:id', (req,res) => {
  const id = req.params.id;
  db.query(`DELETE FROM movies WHERE id = "${id}"`, function(err, results) {
    res.json("Movie deleted");
  });
});

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});