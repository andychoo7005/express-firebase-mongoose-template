const User = require('#models/User.model');
const Verification = require('#models/Verification.model');

const _ = require('lodash');
const bcrypt = require('bcrypt');
const moment = require('moment');

const responses = require('#helpers/responses');
const EmailService = require('#services/email.service');
const EmailManager = require('#helpers/emailManager');
const { hostingUrl } = require('#config/env');
const { auth } = require('#helpers/firebase');

exports.register = async (params) => {
  const { email, password } = params;

  const user = await User.findOne({ email });

  if (!_.isEmpty(user)) {
    throw responses.failure('This user is existed in the system. Please try another one', { isExisted: true });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const finalParams = { ...params, password: hashedPassword };

  const registeredUser = await User.create(finalParams);

  return registeredUser;
};

exports.registerProfile = async (params) => {
  const { phoneNumber } = params;

  const isPhoneNumberExisted = await User.findOne({ phoneNumber });

  if (isPhoneNumberExisted) {
    throw responses.failure('This phone number is existed already, please try another one.');
  }

  const registeredUser = await User.create(params);

  return registeredUser;
};

exports.forgotPassword = async (params) => {
  const { email } = params;
  const verification = await EmailService.expiryVerification(email, 'reset_password');

  await EmailManager.sendNotice(
    email,
    'Reset Password',
    'Plase click on this link to reset your password, link will expire in 5 minutes',
    'Reset',
    `${hostingUrl}/auth/reset-password?token=${verification._id}&email=${email}`,
  );
};

exports.resetPassword = async (params) => {
  const { token, email, password } = params;

  const verification = await Verification.findOneAndUpdate({
    _id: token,
    email,
    type: 'reset_password',
    used: false,
  }, { used: false });

  if (!verification) {
    throw responses.failure('Invalid token');
  }

  if (moment().diff(moment(verification.createdAt), 'minutes') > 5) {
    throw responses.failure('Link expired, please request a new link');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.findOneAndUpdate({
    email,
  }, {
    passwordHash,
  });

  if (!user) {
    throw responses.failure('Invalid user');
  }

  await auth.updateUser(user.uid, {
    password,
    emailVerified: true,
  });
};
