const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const { port } = require('#config/env');
const resModifier = require('#middlewares/resModifier');
const jsonParser = require('#middlewares/jsonParser');
const accessLogger = require('#middlewares/accessLogger');

const routes = require('#controllers/routes');
const errorHandler = require('#middlewares/errorHandler');
const route404Handler = require('#middlewares/route404Handler');

// init mongodb
require('#config/mongodb');

const app = express();

const expressFunction = (customAPIs) => {
  // Security Middlware
  app.use(cors());
  app.use(helmet());

  /* Modify res param for custom functions */
  app.use('/*', resModifier);

  app.get('/', async (req, res) => res.send('ok'));

  app.use(express.urlencoded({ extended: false, limit: '5mb' }));

  // JSON parser
  app.use(jsonParser);

  // access logger
  app.use('/*', accessLogger);

  // Routes init
  app.use('/api', routes);
  app.use('/api', customAPIs);

  // error handler
  app.use(errorHandler);

  // 404 route handler
  app.use('*', route404Handler);

  app.listen(port, () => {
    console.log(`PORT ${port} is listening`);
  }).on('error', (err) => {
    console.log(err);
    process.exit(1);
  });
};
module.exports = expressFunction;
