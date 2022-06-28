const mongoose = require('mongoose');
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

})

module.exports = mongoose.model('Terrain', Terrain)
