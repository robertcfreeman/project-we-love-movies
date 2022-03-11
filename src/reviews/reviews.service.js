const knex = require('../db/connection');

const mapProperties = require('../utils/map-properties');
const addCritic = mapProperties({
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',

})



const read = (reviewId) => {
  return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select('*')
    .where({'r.review_id': reviewId})
    .then(rows => addCritic(rows[0]))
}



const update = (updatedReview) => {
  return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select('r.*', 'c.*')
    .where({'r.review_id': updatedReview.review_id})
    .update(updatedReview)
}

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