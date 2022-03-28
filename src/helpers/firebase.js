const admin = require('firebase-admin');
const env = require('#config/env');

admin.initializeApp({
  credential: admin.credential.cert(env.firebase.admin.credentials_filepath),
  storageBucket: env.firebase.admin.storageBucket,
});

exports.admin = admin;
exports.db = admin.firestore();
exports.auth = admin.auth();
exports.fbStorage = admin.storage();
