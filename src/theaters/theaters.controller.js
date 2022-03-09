const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const theatersService = require('./theaters.service');

const list = async (req, res, next) => {
  const data = await theatersService.list();
  console.log({data})
  res.json({data});
}

module.exports = {
  list,
}