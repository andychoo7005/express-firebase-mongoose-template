/**
 * @typedef {Object} success_r
 * @property {Number} code HTTP Status Code
 * @property {string} status "success"
 * @property {Object} data response object
 */

/**
 * @typedef {Object} fail_r
 * @property {Number} code HTTP Status Code
 * @property {string} status "fail"
 * @property {string} message "Reasons for failure"
 * @property {Object} data response object
 */

/**
 * @typedef {Object} error_r
 * @property {Number} code HTTP Status Code
 * @property {string} status "error"
 * @property {string} message "Reasons for errors"
 * @property {string} errorCode "Reasons for errors"
 * @property {Object} data response object
 */

/**
 * Success Response Formatter
 * @param {Object} data response object
 * @param {!Number} code HTTP Status Code
 * @returns {success_r} Jsend-ish compliant response object
 */
exports.success = (data = undefined, code = 200) => ({
  code,
  status: 'success',
  data,
});

/**
 * Failure Response Formatter
 * @param {String} message Reasons for failure
 * @param {Object} data response object
 * @param {Number} code HTTP Status Code
 * @returns {fail_r} Jsend-ish compliant response object
 */
exports.failure = (message, data, code = 400) => ({
  code,
  status: 'fail',
  message,
  data,
});

/**
 * Error Response Formatter
 * @param {String} message Reasons for failure
 * @param {String} errorCode Error Specific Code
 * @param {Object} data response object
 * @returns {fail_r} Jsend-ish compliant response object
 */
exports.exception = (message, errorCode, data) => ({
  code: 500,
  status: 'error',
  message,
  errorCode,
  data,
});

exports.forbidden = () => ({
  code: 403,
  status: 'error',
  message: 'You are not authorized to perform this function',
  errorCode: 403,
  data: null,
});
