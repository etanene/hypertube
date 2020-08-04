const { InternalError } = require('../errors');
const { userMovieService } = require('../services');

const addUserMovie = async (req, res) => {
  try {
    const response = await userMovieService.addUserMovie(req.body);
    res.send(response);
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

const getUserMovie = async (req, res) => {
  try {
    const userMovies = await userMovieService.getUserMovie(req.body.user_id);
    res.send(userMovies);
  } catch (e) {
    if (e instanceof Error) {
      res.status(e.status || 500).send(new InternalError());
    } else {
      res.status(e.status || 500).send(e);
    }
  }
};

module.exports = {
  addUserMovie,
  getUserMovie,
};
