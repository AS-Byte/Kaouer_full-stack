const { Schema, model } = require("mongoose");

const arbitre = new Schema(
{
  nom: { type: String },
});

module.exports = Arbitre = model("arbitre", arbitre);
