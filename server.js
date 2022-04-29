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

// Route that sends the table of movies
app.get('/api/movies', (req,res) => {
  db.query('SELECT * FROM movies', function(err, results){
    res.json(results);
  });
});

//Route that when called with a movie will add that movie to the table
app.post('/api/add-movie', (req,res) => {
  const movie = req.body.movie;
  db.query(`INSERT INTO movies (movie_name) values (?)`, movie, function(err, results){
    res.json('Movie added');
  });
});

// Route that will return the reviews table
app.get('/api/movies/reviews', (req,res) => {
  db.query('SELECT * FROM reviews', function(err, results){
    res.json(results);
  });
});

// This route allows the user to add a review to the table, takes in a movie title and review and searches for the movie in the
// review table, takes the id of the moview we found and uses that to make a new review entry for the review passed in
app.post('/api/add-review', (req, res) => {
  const {movie, review} = req.body;
  db.query(`SELECT id FROM movies WHERE movie_name = ?`, movie, function(err, results) {
    if(results.length == 0) {
      res.json("Not a movie in the database");
    }
    else {
      db.query(`INSERT INTO reviews (movie_id, review) values (?, ?)`, [results[0].id, review],function(err, results) {
        res.json("Review added");
      });
    }
  });
});

// updates a review by changing the review text given the id number of the review
app.post('/api/update-review', (req, res) => {
  const{id, review} = req.body;
  db.query(`UPDATE reviews SET review = ? WHERE id = ?`, [review, id], function(err, results) {
    res.json("Review updated");
  });
});

//Deletes a movie row from the movie table given the movie to delete
app.delete('/api/movie/:id', (req,res) => {
  const id = req.params.id;
  db.query(`DELETE FROM movies WHERE id = ?`, id, function(err, results) {
    res.json("Movie deleted");
  });
});

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});