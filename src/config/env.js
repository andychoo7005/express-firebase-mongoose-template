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
  hostingUrl = process.env.HOSTING_URL;
  firebase = {
    admin: {
      credentials_filepath: path.resolve(process.env.FIREBASE_ADMIN_CREDENTIALS_FILENAME),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      rtdb: process.env.FIREBASE_REALTIME_DATABASE,
    },
  };
  mailgun = {
    domain: process.env.DOMAIN,
    apikey: process.env.MAILGUN_API_KEY,
    sender: process.env.MAILGUN_SENDER,
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
