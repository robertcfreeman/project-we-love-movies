const res = require('express/lib/response');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const moviesService = require('./movies.service');


const list = async () => {
  const data = await moviesService.list();
  res.json({data});
};

const listMoviesShowing = async () => {
  const data = await moviesService.listMoviesShowing();
  res.json({data});
}








module.exports = {
  list: asyncErrorBoundary(list),
  listMoviesShowing: asyncErrorBoundary(listMoviesShowing),
}