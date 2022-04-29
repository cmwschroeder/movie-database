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
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

app.get('/api/movies', (req,res) => {

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