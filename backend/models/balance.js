const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
let Balance = new Schema({
  valeur:{type:Number}
})

module.exports = mongoose.model('Balance', Balance)
