const knex = require('../db/connection');

const list = () => {
  return knex('movies').select('*');
};


const listMoviesShowing = () => {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('m.*')
    .where({'mt.is_showing': true})
};

const read = (movieId) => {
  return knex('movies')
    .select('*')
    .where({'movie_id': movieId})
    .first();
};

const listTheatersWhereMoviesAreShowing = (movieId) => {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .join('theaters as t', 'mt.theater_id', 't.theater_id')
    .select('t.*')
    .where({'m.movie_id': movieId})
}






module.exports = {
  list,
  listMoviesShowing,
  read,
  listTheatersWhereMoviesAreShowing,
}