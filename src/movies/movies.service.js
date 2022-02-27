const knex = require('../db/connection');

const mapProperties = require('../utils/map-properties');
const addCritic = mapProperties({
  critic_id: 'critic.critic_id',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
  created_at: 'critic.created_at',
  updated_at: 'critic.updated_at',
})


const list = () => {
  return knex('movies').select('*');
};

//todo list current movies showing. Test is failing due to the first movie in the returning query is not being updated to "is_showing: false"
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

//todo addCritic properties to critic key for each review
const listMovieReviews = (movieId) => {
  return knex('movies as m')
    .join('reviews as r', 'm.movie_id', 'r.movie_id')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select('r.*', 'c.*')
    .where({'m.movie_id': movieId})
    .first()
    .then(addCritic)
   
}






module.exports = {
  list,
  listMoviesShowing,
  read,
  listTheatersWhereMoviesAreShowing,
  listMovieReviews,
}