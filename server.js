// dependencies
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const express = require('express');
const localSignupStrategy = require('./utils/local-signup');
const localLoginStrategy = require('./utils/local-login');
// const authCheckMiddleware = require('./utils/auth-check');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const app = express();

// set up app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(cors());
app.use(passport.initialize());

// load passport strategies and authentication checker middleware
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
// app.use('/api', authCheckMiddleware);

// connect to db
mongoose.connect('mongodb://localhost:27017/nightlife-coordinator')
  .then(() =>  console.log('Database connection successful'))
  .catch((err) => console.error(err));

// serve pages and routes
app.use(express.static('build'));

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

// listen
app.listen(3000, () => console.log('App listening on port 3000!'));