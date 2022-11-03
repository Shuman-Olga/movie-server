const Movie = require('../models/movieModel');

exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a Tutorial
  const movie = new Movie({
    movieName: req.body.data.movieName,
    movieReview: req.body.data.movieReview,
  });

  // Save Tutorial in the database
  Movie.create(movie, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Tutorial.',
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const movieName = req.query.movieName;

  Movie.getAll(movieName, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tutorials.',
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  Movie.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Tutorial with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};
