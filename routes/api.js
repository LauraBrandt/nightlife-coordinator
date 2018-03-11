const axios = require('axios');
const express = require('express');
const router = express.Router();
const Bar = require('../models/bar.js');
const User = require('../models/user.js');
const authCheckMiddleware = require('../utils/auth-check');

router.get('/bars/:location/:page', (req, res) => {
  const numResults = 20;
  const offset = numResults * (req.params.page - 1);
  const url = `https://api.yelp.com/v3/businesses/search?term=bar&location=${req.params.location}&offset=${offset}`;
  const accessToken = process.env.YELP_APIKEY;
  console.log("about to send yelp request, accessToken:", accessToken)
  axios({ method: 'get', url: url, headers: { 'Authorization': 'Bearer ' + accessToken } })
    .then(result => {
      console.log("got a result!:", result)
      res.send(result.data);
    })
    .catch(err => {
      console.log("got an error:", err)
      res.send(err.response.data);
    });
});

router.get('/attendees/:barid', (req, res) => {
  Bar.findOne({ yelpID: req.params.barid })
    .populate('attendees')
    .exec((err, bar) => {
      if (err) return next(err);
      const attendees = bar ? bar.attendees : [];
      return res.json({attendees: attendees});
    });
});

router.put('/attendees/:barid/:userid', authCheckMiddleware, (req, res) => {
  const barYelpId = req.params.barid;
  const userId = req.params.userid;

  Bar.findOne({ yelpID: barYelpId }, (err, bar) => {
    if (err) return next(err);
    let action;

    if (bar) { // bar is already in db, add/remove attendee
      const index = bar.attendees.indexOf(userId);
      if (index === -1) {
        bar.attendees.push(userId);
        action = "add"
      } else {
        bar.attendees.splice(index, 1);
        action = "remove"
      }
      
      bar.save((err, bar) => {
        if (err) return next(err);
        return res.send({bar, action});
      });
      
    } else { // bar is not in db, add it and attendee
      const newBar = new Bar({yelpID: barYelpId, attendees: [userId,]});
      action = "add"

      newBar.save((err, bar) => {
        if (err) return next(err);
        return res.send({bar, action});
      });
    }
  });
});

module.exports = router;