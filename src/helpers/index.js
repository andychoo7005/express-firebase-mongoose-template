const responses = require('#helpers/responses');

const _ = require('lodash');

/**
 * Asynchronously Validates parameters according to the Joi Schema parameter.
 * @param {object} data Data that is to be validated.
 * @param {object} joiObject Joi Schema to validate against
 * @returns {object} The response object.
 */
exports.asyncJoiValidate = async (data, joiObject) => {
  try {
    const validatedData = await joiObject.validateAsync(data, {
      abortEarly: false,
      allowUnknown: false,
      convert: true,
      stripUnknown: true,
    });
    return validatedData;
  } catch (error) {
    const errors = {};
    const messages = [];
    _.map(error.details, (item) => {
      errors[`${item.context.label}`] = item.message;
      messages.push(item.message);
    });

    throw responses.failure(messages.join(', '), errors, 400);
  }
};
