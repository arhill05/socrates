// #region imports

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  path: '/ws',
  serveClient: false
});
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config({
  path: 'variables.env'
});
require('./models/Question');
require('./models/Session');

// #endregion imports

const index = require('./routes/index');
const socketEvents = require('./routes/socketEvents');

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};

// #region mongoose

mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error('Mongoose error: ' + err.message);
});

// #endregion mongoose

// #region systemic middleware

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// #endregion systemic middleware

app.use('/', index);
socketEvents(io);

// #region error handling
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(err.status || 500);
  res.json(errorDetails)
});

// #endregion error handling



server.listen(3000);