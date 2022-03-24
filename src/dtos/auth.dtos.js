const Joi = require('joi');

const address = Joi.object({
  mainAddress: Joi.string().required(),
  postcode: Joi.number().positive().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
});

exports.register = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  address,
  dateOfBirth: Joi.date().iso(),
  countryCode: Joi.string().required(),
  password: Joi.string().min(6).max(30).required(),
});

exports.forgotPassword = Joi.object({
  email: Joi.string().required(),
});

exports.registerProfile = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  address,
  dateOfBirth: Joi.date().iso(),
  countryCode: Joi.string().required(),
});

exports.resetPassword = Joi.object({
  token: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
