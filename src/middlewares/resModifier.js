const responses = require('#helpers/responses');

module.exports = (req, res, next) => {
  res.success = (data, code = 200) => {
    const output = responses.success(data, code);
    return res.status(code).send(output);
  };

  res.failure = (message, data, code = 400) => {
    const output = responses.failure(message, data, code);
    return res.status(code).send(output);
  };

  next();
};
