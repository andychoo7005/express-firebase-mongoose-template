const { asyncJoiValidate } = require('#helpers/index');
const ProfileService = require('#services/profile.service');
const ProfileDTO = require('#dtos/profile.dtos');

exports.getProfile = async (req, res, next) => {
  try {
    const params = await asyncJoiValidate(req.query, ProfileDTO.getProfile);
    const response = await ProfileService.getProfile(params, req.user);
    return res.success(response);
  } catch (err) {
    return next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const params = await asyncJoiValidate(req.body, ProfileDTO.updateProfile);
    const response = await ProfileService.updateProfile(params, req.user);
    return res.success(response);
  } catch (err) {
    return next(err);
  }
};
