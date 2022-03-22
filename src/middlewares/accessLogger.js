/* eslint-disable no-console */
module.exports = (req, res, next) => {
  console.log(`${req.method} - ${req.originalUrl}`);
  console.log('body', req.body);
  next();
};
