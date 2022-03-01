const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reviewsService = require('./reviews.service');

const reviewExists = async (req, res, next) => {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    next();
  }
  next({status: 404, message: 'Review cannot be found.'})
}

const update = async (req, res, next) => {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await reviewsService.update(updatedReview);
  res.json({data});
}

const destroy = async (req, res, next) => {
  const {review} = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatusCode(204);

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