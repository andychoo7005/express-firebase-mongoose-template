const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const verificationSchema = new Schema({
  type: {
    type: String,
    enum: ['reset_password'],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, strict: 'throw',
});

verificationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('verification', verificationSchema);
