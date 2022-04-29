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
  })
});

app.post('/api/add-movie', (req,res) => {

});

app.post('/api/update-review', (req, res) => {

});

app.delete('/api/movie/:id', (req,res) => {

});

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});