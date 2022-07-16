const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
let Centre = new Schema({
  cname :{type:String},
  cemail :{type : String},
  clocation :{type:String},
  cphone:{type:Number},
  balance:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "balance"
  }]
})
module.exports = mongoose.model('Centre', Centre)