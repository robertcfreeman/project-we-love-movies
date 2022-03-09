const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reviewsService = require('./reviews.service');

const reviewExists = async (req, res, next) => {
  console.log('req.params.reviewId', req.params.reviewId);
  const review = await reviewsService.read(req.params.reviewId);
  console.log('review', review);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({status: 404, message: 'Review cannot be found.'})
}

const update = async (req, res, next) => {
  console.log('req.body.data', req.body.data);
  console.log('res.locals.review', res.locals.review);
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  console.log('updatedReview', updatedReview);
  const data = await reviewsService.update(updatedReview);
  console.log('data', data)
  const review = await reviewsService.read(req.params.reviewId);
  res.json({data: review});
}

const destroy = async (req, res, next) => {
  const {review} = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);

}



module.exports = {
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update)
  ],
  destroy: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy)
  ],
}