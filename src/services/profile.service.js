const User = require('#models/User.model');

exports.getProfile = async (params) => {
  const updatedUser = await User.findOne({ uid: params.uid });

  return updatedUser;
};

exports.updateProfile = async (uid, params) => {
  const updatedUser = await User.findOneAndUpdate(uid, params);

  return updatedUser;
};
