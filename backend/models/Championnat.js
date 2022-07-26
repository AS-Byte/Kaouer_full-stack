const { Schema, model } = require("mongoose");

const championnat = new Schema(


{
    nom: { type: String },
    typeChampionnat: { type: String },
    equipe: { type: String },
    terrain: { type: String },
    arbitre: { type: [] },
    score: { type: Number },
  });
  
  module.exports = Championnat =model("championnat", championnat);