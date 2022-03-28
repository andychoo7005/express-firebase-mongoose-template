require('dotenv').config();
const path = require('path');

const port = process.env.PORT;

let databaseName = '';
let databaseHost = '';
let databaseUsername = '';
let databasePassword = '';
let hostingUrl = '';
let firebase = {};
let mailgun = {};

if (process.env.NODE_ENV === 'production') {
// production info
} else {
  databaseName = process.env.DATABASE_NAME;
  databaseHost = process.env.DATABASE_HOST;
  databaseUsername = process.env.DATABASE_USERNAME;
  databasePassword = process.env.DATABASE_PASSWORD;
  hostingUrl = 'http://localhost:4000';
  firebase = {
    admin: {
      credentials_filepath: path.resolve(process.env.FIREBASE_ADMIN_CREDENTIALS_FILENAME),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    },
  };
  mailgun = {
    domain: process.env.DOMAIN,
    apikey: process.env.MAILGUN_API_KEY,
  };
}

module.exports = {
  port,
  databaseName,
  databaseHost,
  databaseUsername,
  databasePassword,
  hostingUrl,
  firebase,
  mailgun,
};
