/* eslint-disable no-console */
const responses = require('#helpers/responses');

const isHttpStatusCode = (code) => {
  const test = Number(code);
  if (code > 100 && code < 599) {
    return true;
  }
  return false;
};

module.exports = (err, req, res, next) => {
  if ((err.code) && (isHttpStatusCode(err.code) === true) && err.status) {
    return res.status(err.code).send(err);
  }

  // logging all unexpected error
  console.error(`${req.method} - ${req.originalUrl} [Unexpected Error]`, err);
  return res.status(500).send(responses.exception(err.message, err.code));
};
