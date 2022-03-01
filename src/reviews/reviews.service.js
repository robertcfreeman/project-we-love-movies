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



const read = (reviewId) => {
  return knex('reviews')
    .select('*')
    .where({'review_id': reviewId})
}

//todo test is receiving 'Review cannot be found'. Not expecting a console error
const update = (updatedReview) => {
  return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .where({'r.review_id': updatedReview.review_id})
    .update(updatedReview, '*')
    .then(addCritic)
}

//todo test is receiving 'Review cannot be found'. Not expecting a console error
const destroy = (reviewId) => {
  return knex('reviews')
    .where({'review_id': reviewId})
    .del();
}


module.exports = {
  read,
  update,
  delete: destroy,
}