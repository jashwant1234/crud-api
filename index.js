'use strict';
const config = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { join } = require('path');
const morgan = require('morgan');
const { connect } = require('mongoose');

function bootstrap() {
  const router = require('./routes');

  console.log(config.parsed);
  const PORT = process.env.PORT || 8080;
  const app = express();

  app.use(morgan('dev'));
  app.use(cors());
  app.disable('etag');
  app.disable('x-powered-by');
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(join(__dirname, 'public')));

  app.get('/', (req, res) => {
    res.send({
      status: true,
      data: 'welcome to Crud Api',
      url: req.url,
    });
  });

  app.use(router);

  app.all('*', (req, res) => {
    res
      .status(404)
      .send({ status: false, error: 'api endpoint not found', url: req.url });
  });

  app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
  });
}

connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => {
    console.log('connected');
    bootstrap();
  })
  .catch(($) => {
    console.log('Failed to connect');
    console.error($);
    process.exit(0);
  });
