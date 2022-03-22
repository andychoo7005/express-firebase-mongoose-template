const Verification = require('#models/Verification.model');
const moment = require('moment');
const responses = require('#helpers/responses');

exports.expiryVerification = async (email, type) => {
  const prev = await Verification.findOne({ email }).sort({
    type,
    createdAt: -1,
  });

  if (prev) {
    if (moment().diff(prev.createdAt, 'minutes') <= 5) {
      throw responses.failure('Please wait at least 5 minutes before you can send again.');
    }
  }

  return Verification.create({
    type,
    value: email,
  });
};
