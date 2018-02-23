const axios = require('axios');
const express = require('express');
const router = express.Router();
const Bar = require('../models/bar.js');
const User = require('../models/user.js');

router.get('/bars/:location', (req, res) => {
  const url = `https://api.yelp.com/v3/businesses/search?term=bar&location=${req.params.location}`;
  const accessToken = process.env.YELP_APIKEY;
  axios({ method: 'get', url: url, headers: { 'Authorization': 'Bearer ' + accessToken } })
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.send(err.response.data);
    });
});

router.get('/attendees/:barid', (req, res) => {
  Bar.findOne({ yelpID: req.params.barid }, (err, bar) => {
    if (err) return next(err);
    const attendees = bar ? bar.attendees : [];
    return res.json({attendees: attendees});
  });
});

module.exports = router;