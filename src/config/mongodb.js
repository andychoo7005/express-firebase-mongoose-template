const mongoose = require('mongoose');

const { connection } = mongoose;

const {
  databaseName, databaseHost, databaseUsername, databasePassword,
} = require('#config/env');

const uri = `mongodb+srv://${databaseUsername}:${databasePassword}@${databaseHost}/${databaseName}?retryWrites=true&w=majority`;

mongoose.connect(uri);

connection.on('connected', () => {
  console.log(`Mongoose connected to ${databaseHost}`);
});

connection.on('disconnected', () => {
  console.log(`Mongoose connected to ${databaseHost}`);
});

connection.on('error', (err) => {
  console.log(`Mongoose connection error ${err}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
