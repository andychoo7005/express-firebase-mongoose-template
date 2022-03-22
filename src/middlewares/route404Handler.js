const responses = require('#helpers/responses');

module.exports = (req, res) => {
  const output = responses.failure('Invalid Path', undefined, 404);
  return res.status(404).send(output);
};
