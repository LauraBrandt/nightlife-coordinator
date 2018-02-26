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
  Bar.findOne({ yelpID: req.params.barid })
    .populate('attendees')
    .exec((err, bar) => {
      if (err) return next(err);
      const attendees = bar ? bar.attendees : [];
      return res.json({attendees: attendees});
    });
});

router.put('/attendees/:barid/:userid', (req, res) => {
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

        Bar.findById(bar._id)
          .populate('attendees')
          .exec((err, bar) => {
            if (err) return next(err);

            return res.send({bar, action});
          });
      });
    } else { // bar is not in db, add it and attendee
      const newBar = new Bar({yelpID: barYelpId, attendees: [userId,]});
      action = "add"

      newBar.save((err, bar) => {
        if (err) return next(err);
        
        Bar.findById(bar._id)
          .populate('attendees')
          .exec((err, bar) => {
            if (err) return next(err);

            return res.send({bar, action});
          });
      })
    }
  });
});

module.exports = router;