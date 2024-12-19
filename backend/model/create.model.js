const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
  name: {type:String,required:true},
  description: {type:String,required:true},
  startDate: {type:Date,required:true},
  endDate: {type:Date,required:true},
  organizer: {type:String,required:true},
  userId: {type:String,required:true},
});

module.exports = mongoose.model('Hackathon', HackathonSchema);
