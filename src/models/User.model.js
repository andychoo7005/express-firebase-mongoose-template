const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

mongoose.plugin(mongooseUniqueValidator);

const AddressSchema = new Schema({
  mainAddress: {
    type: String,
    required: true,
  },
  postcode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: AddressSchema,
  },
  dateOfBirth: {
    type: Date,
  },
  countryCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', UserSchema);
