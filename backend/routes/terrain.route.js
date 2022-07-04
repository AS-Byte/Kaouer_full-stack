const express = require('express')
const app = express()
const terrainRoute = express.Router()

const nodemailer = require('nodemailer')
var transport = nodemailer.createTransport({
  service:"outlook",
  //host: "smtp.mailtrap.io",
  //port: 2525,
  auth: {
    //user: "9ed730d4516087",
    //pass: "694acc0e56afe2"
    user: "amine.n.oueslati@outlook.fr",
    pass: "Pidev$2022"
  }
});

// Terrain model
let Terrain = require('../models/Terrain')


// Add Terrain & send email
terrainRoute.route('/create').post((req, res, next) => {
  Terrain.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)

      var options={
        from: "amine.n.oueslati@outlook.fr",
        to: data.email,
        subject: ("Bienvenue sur Kaouer.tn"),
        text: ("Bonjour "+ data.name+ '<br/>'+
            "Votre terrain a été correctement ajouté, " +
            "voici les données que vous avez saisies"+'<br/>'+
            "Emplacement: "+data.location+'<br/>'+
            "Etat: "+data.state+'<br/>'+
            "Type: "+data.type+'<br/>'+
            "Surface: "+data.surface+'<br/>'+
            "Capacité: "+data.capacity+'<br/>'+
            "N° de téléphone de contact: "+data.phone+'<br/>'+
            "Nous vous remercions de votre confiance" +'<br/>'+
            "El Jam3ia"
        )
      }

      transport.sendMail(options, function (err,info){
        if (err){
          console.log(err);
          return;
        }
        console.log("Sent: "+ info.response);

      })

    }
  })




})

// Get All Terrains
terrainRoute.route('/').get((req, res) => {
  Terrain.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single terrain
terrainRoute.route('/read/:id').get((req, res) => {
  Terrain.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update terrain
terrainRoute.route('/update/:id').put((req, res, next) => {
  Terrain.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    },
  )
})

// Delete terrain
terrainRoute.route('/delete/:id').delete((req, res, next) => {
  Terrain.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})
module.exports = terrainRoute