// dependencies
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes/routes');

const app = express();

// set up app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(cors());

// connect to db
mongoose.connect('mongodb://localhost:27017/nightlife-coordinator')
  .then(() =>  console.log('Database connection successful'))
  .catch((err) => console.error(err));

// serve pages and routes
app.use(express.static('build'));

app.use('/api', routes);

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