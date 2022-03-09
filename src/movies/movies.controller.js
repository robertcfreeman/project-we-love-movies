const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const moviesService = require('./movies.service');


const list = async (req, res, next) => {
  let data;
  if (req.query.is_showing === 'true') {
    console.log('hello world')
    data = await moviesService.listMoviesShowing();
  } else {
    data = await moviesService.list();
  }
  res.json({data});
};

const movieExists = async(req, res, next) => {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  };
  next({status: 404, message: 'Movie cannot be found.'});
};

const read = (req, res, next) => {
  const {movie: data} = res.locals;
  res.json({data});
};

const listTheatersWhereMoviesAreShowing = async(req, res, next) => {
  const data = await moviesService.listTheatersWhereMoviesAreShowing(req.params.movieId);
  res.json({data});
};

const listMovieReviews = async (req, res, next) => {
  const data = await moviesService.listMovieReviews(req.params.movieId);
  res.json({data});
}






module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheatersWhereMoviesAreShowing: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheatersWhereMoviesAreShowing)
  ],
  listMovieReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listMovieReviews),
  ],
}