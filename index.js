const express = require('express'),
  app = express(),
  cors = require('cors'),
  db = require('./db/db.js'),
  parser = require('body-parser'),
  dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(parser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});
app.get('/api/movies', (req, res) => {
  const sql = 'SELECT * FROM movie_reviews';
  db.query(sql, (err, result) => {
    res.send(result);
  });
});
app.post('/api/add', (req, res) => {
  console.log(req.body);
  const sql = 'INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)';
  const data = [req.body.data.movieName, req.body.data.movieReview];
  db.query(sql, data, (err, result) => {
    console.log(err);
  });
});
app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM movie_reviews WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) console.log(err);
  });
});
app.delete('/api/update', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM movie_reviews WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) console.log(err);
  });
});
app.get('/api/movies/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM movie_reviews WHERE id=${id}`;
  db.query(sql, id, (err, result) => {
    res.send(result);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
