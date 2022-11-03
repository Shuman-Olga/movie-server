const sql = require('../db/db.js');

// constructor
const Movie = function (movie) {
  this.movieName = movie.movieName;
  this.movieReview = movie.movieReview;
};

Movie.create = (newMovie, result) => {
  sql.query('INSERT INTO movie_reviews SET ?', newMovie, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created tutorial: ', { id: res.insertId, ...newMovie });
    result(null, { id: res.insertId, ...newMovie });
  });
};

Movie.getAll = (movieName, result) => {
  let query = 'SELECT * FROM movie_reviews';

  if (movieName) {
    query += ` WHERE movieName LIKE '%${movieName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('movisList: ', res);
    result(null, res);
  });
};
Movie.remove = (id, result) => {
  sql.query('DELETE FROM movie_reviews WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted movie with id: ', id);
    result(null, res);
  });
};

module.exports = Movie;
