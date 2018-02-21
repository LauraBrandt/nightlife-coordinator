const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({ 
  yelpID: String, 
  attendees:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;