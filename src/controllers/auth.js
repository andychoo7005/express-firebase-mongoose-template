const { asyncJoiValidate } = require('#helpers/index');

const AuthDTO = require('#dtos/auth.dtos');

const AuthService = require('#services/auth.service');

exports.register = async (req, res, next) => {
  try {
    const params = await asyncJoiValidate(req.body, AuthDTO.register);
    const response = await AuthService.register(params);
    return res.success(response);
  } catch (err) {
    return next(err);
  }
};

exports.registerProfile = async (req, res, next) => {
  try {
    const params = await asyncJoiValidate(req.body, AuthDTO.registerProfile);
    const response = await AuthService.registerProfile(params);

    return res.success(response);
  } catch (err) {
    return next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const params = await asyncJoiValidate(req.body, AuthDTO.forgotPassword);
    const response = await AuthService.forgotPassword(params);
    return res.success(response);
  } catch (err) {
    return next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const params = await asyncJoiValidate(req.body, AuthDTO.resetPassword);
    const response = await AuthService.resetPassword(params);
    return res.success(response);
  } catch (err) {
    return next(err);
  }
};
