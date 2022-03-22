/* eslint-disable no-console */
const express = require('express');
const responses = require('#helpers/responses');

module.exports = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  express.json({ limit: '10mb' })(req, res, (err) => {
    if (err) {
      console.error(err);
      return res
        .status(400)
        .send(responses.failure('Invalid JSON Syntax', err));
    }
    next();
  });
};
