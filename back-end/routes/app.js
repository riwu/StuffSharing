const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const admin = require('./admin');
// const analytics = require('./routes/analytics');
const index = require('./index');
const me = require('./me');
const stuff = require('./stuff');
const users = require('./users');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(logger((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens['response-time'](req, res), 'ms',
  JSON.stringify(req.body),
].join(' ')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/me', me);
app.use('/users', users);
app.use('/stuff', stuff);
app.use('/admin', admin);
// app.use('/admin/analytics', analytics);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('gotten error', err);
  res.send('error');
});

module.exports = app;
