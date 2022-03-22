const { auth } = require('#helpers/firebase');
const User = require('#models/user-model');
const responses = require('#helpers/responses');
const projections = require('#helpers/projections');

module.exports = async (req, res, next) => {
  try {
    if (!req.user.admin) {
      return res.status(401).send(
        responses.failure('Unauthorized', {}, 401),
      );
    }
  } catch (e) {
    return res.status(500).send(responses.exception(e.message, e.code));
  }
  return next();
};
