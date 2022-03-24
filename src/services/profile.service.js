const User = require('#models/User.model');

exports.getProfile = async (params, user) => {
  const updatedUser = await User.findOne({ uid: user.uid });

  return updatedUser;
};

exports.updateProfile = async (params, user) => {
  const updatedUser = await User.findOneAndUpdate({ uid: user.uid }, params);

  return updatedUser;
};
