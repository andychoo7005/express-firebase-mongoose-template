const Joi = require('joi');

const address = Joi.object({
  mainAddress: Joi.string().required(),
  postcode: Joi.number().positive().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
});

exports.updateProfile = Joi.object({
  // uid here refers to the firebase uid.
  // uid: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  address,
  dateOfBirth: Joi.date().iso(),
  countryCode: Joi.string().required(),
  avatar: Joi.string().base64(),
});

exports.getProfile = Joi.object({
  // uid here refers to the firebase uid.
  // uid: Joi.string().required(),
});
