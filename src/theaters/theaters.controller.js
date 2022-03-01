const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const theatersService = require('./theaters.service');

const list = async (req, res, next) => {
  const data = await theatersService.list();
  res.json({data});
}

module.exports = {
  list,
}