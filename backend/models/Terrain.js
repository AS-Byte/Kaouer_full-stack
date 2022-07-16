const mongoose = require('mongoose');
const balance= require('./balance')
const Schema = mongoose.Schema;

// Define schema
let Terrain = new Schema({
  name :{type:String},
  email :{type : String},
  location :{type:String},
  state : {type:String},
  type :{type:String},
  surface :{type:String},
  capacity :{type:Number},
  phone:{type:Number},
  balance:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "balance"
  }]

})

module.exports = mongoose.model('Terrain', Terrain)
