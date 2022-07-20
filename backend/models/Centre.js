const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
let Centre = new Schema({
  cname :{type:String},
  cemail :{type : String},
  clocation :{type:String},
  cphone:{type:Number},
  terrain:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "terrain"
  }]
})
module.exports = mongoose.model('Centre', Centre)
